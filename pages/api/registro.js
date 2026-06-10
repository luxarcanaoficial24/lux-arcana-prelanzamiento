import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { nombre, correo } = req.body;
  if (!nombre || !correo) return res.status(400).json({ error: 'Datos incompletos' });

  try {
    await client.create({
      _type: 'registroPrelanzamiento',
      nombre,
      correo,
      fecha: new Date().toISOString(),
      fuente: 'landing-expo-2026',
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al guardar' });
  }
}
