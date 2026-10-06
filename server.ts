import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BOOKINGS_FILE = path.join(__dirname, 'bookings-data.json');
const HOTEL_WHATSAPP = '918010726699';

function loadBookings() {
  try {
    if (fs.existsSync(BOOKINGS_FILE)) {
      const raw = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to read bookings file:', err);
  }
  return [];
}

function saveBookings(bookings: unknown[]) {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write bookings file:', err);
  }
}

function formatWhatsAppMessage(booking: Record<string, unknown>) {
  return (
    `*CHANDU HOTEL - NEW TABLE BOOKING (टेबल बुकिंग कन्फर्मेशन)*\n\n` +
    `*Booking ID:* #${booking.id}\n` +
    `*Guest Name (नाम):* ${booking.fullName}\n` +
    `*Mobile No (मोबाइल):* ${booking.phone}\n` +
    (booking.email ? `*Email:* ${booking.email}\n` : '') +
    `*Date (तारीख):* ${booking.date}\n` +
    `*Time Slot (समय):* ${booking.timeSlot}\n` +
    `*Guests (मेहमान):* ${booking.guestsCount} People\n` +
    `*Seating Area:* ${booking.seatingArea}\n` +
    (booking.specialOccasion && booking.specialOccasion !== 'None'
      ? `*Occasion (अवसर):* ${booking.specialOccasion}\n`
      : '') +
    (booking.notes ? `*Special Request (नोट्स):* ${booking.notes}\n` : '') +
    `*Booked At:* ${booking.createdAt}\n\n` +
    `नमस्ते, चंदू होटल में यह टेबल बुक किया गया है। कृपया टेबल आरक्षित रखें!`
  );
}

async function dispatchAutomatedWhatsApp(messageText: string, booking: Record<string, unknown>) {
  const results = {
    dispatchedServerSide: false,
    provider: 'whatsapp-direct-link',
    recipient: HOTEL_WHATSAPP,
  };

  // 1. Meta WhatsApp Business Cloud API (if configured)
  const cloudToken = process.env.WHATSAPP_CLOUD_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (cloudToken && phoneNumberId) {
    try {
      const resp = await fetch(
        `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cloudToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: HOTEL_WHATSAPP,
            type: 'text',
            text: { body: messageText },
          }),
        }
      );
      if (resp.ok) {
        results.dispatchedServerSide = true;
        results.provider = 'meta-cloud-api';
        return results;
      }
    } catch (err) {
      console.error('Meta WhatsApp Cloud API error:', err);
    }
  }

  // 2. CallMeBot WhatsApp API (if configured)
  const callMeBotKey = process.env.CALLMEBOT_API_KEY;
  if (callMeBotKey) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${HOTEL_WHATSAPP}&text=${encodeURIComponent(
        messageText
      )}&apikey=${encodeURIComponent(callMeBotKey)}`;
      const resp = await fetch(url);
      if (resp.ok) {
        results.dispatchedServerSide = true;
        results.provider = 'callmebot-api';
        return results;
      }
    } catch (err) {
      console.error('CallMeBot API error:', err);
    }
  }

  // 3. Custom Webhook URL (Make / Zapier / WATI / Interakt / UltraMsg)
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: HOTEL_WHATSAPP,
          message: messageText,
          booking,
        }),
      });
      if (resp.ok) {
        results.dispatchedServerSide = true;
        results.provider = 'custom-webhook';
        return results;
      }
    } catch (err) {
      console.error('Custom WhatsApp webhook error:', err);
    }
  }

  return results;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // GET all table reservations
  app.get('/api/bookings', (_req, res) => {
    const bookings = loadBookings();
    res.json({
      success: true,
      hotelWhatsApp: HOTEL_WHATSAPP,
      bookings,
    });
  });

  // POST new table reservation & trigger automated WhatsApp message to 8010726699
  app.post('/api/bookings', async (req, res) => {
    try {
      const {
        id,
        fullName,
        phone,
        email,
        date,
        timeSlot,
        guestsCount,
        seatingArea,
        specialOccasion,
        notes,
      } = req.body || {};

      if (!fullName || !phone || !date || !timeSlot) {
        res.status(400).json({
          success: false,
          error: 'Name, phone number, date, and time slot are required.',
        });
        return;
      }

      const bookingId =
        id || `CH-RES-${Math.floor(10000 + Math.random() * 90000)}`;
      const createdAt = new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      const newBooking = {
        id: bookingId,
        fullName: String(fullName).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : undefined,
        date: String(date),
        timeSlot: String(timeSlot),
        guestsCount: Number(guestsCount) || 2,
        seatingArea: seatingArea || 'Indoor AC Family Hall',
        specialOccasion: specialOccasion || 'None',
        notes: notes ? String(notes).trim() : undefined,
        status: 'Confirmed',
        whatsappRecipient: HOTEL_WHATSAPP,
        createdAt,
      };

      const messageText = formatWhatsAppMessage(newBooking);
      const whatsappResult = await dispatchAutomatedWhatsApp(
        messageText,
        newBooking
      );

      const whatsappUrl = `https://api.whatsapp.com/send?phone=${HOTEL_WHATSAPP}&text=${encodeURIComponent(
        messageText
      )}`;
      const waMeUrl = `https://wa.me/${HOTEL_WHATSAPP}?text=${encodeURIComponent(
        messageText
      )}`;

      const existing = loadBookings();
      const updated = [
        {
          ...newBooking,
          whatsappDispatched: whatsappResult.dispatchedServerSide,
          whatsappProvider: whatsappResult.provider,
          whatsappUrl,
        },
        ...existing,
      ].slice(0, 50);

      saveBookings(updated);

      res.status(201).json({
        success: true,
        booking: newBooking,
        whatsapp: {
          recipient: HOTEL_WHATSAPP,
          formattedNumber: '+91 80107 26699',
          messageText,
          whatsappUrl,
          waMeUrl,
          dispatchedServerSide: whatsappResult.dispatchedServerSide,
          provider: whatsappResult.provider,
        },
      });
    } catch (error) {
      console.error('Error processing table booking:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to process booking.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Chandu Hotel Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
