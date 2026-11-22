import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import handler from './api/contact.ts'

function contactApiDevPlugin(): Plugin {
  return {
    name: 'api-contact-dev-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/contact' && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });
          req.on('end', async () => {
            try {
              const parsedBody = bodyStr ? JSON.parse(bodyStr) : {};
              const customRes: any = {
                setHeader(name: string, value: string) {
                  res.setHeader(name, value);
                  return this;
                },
                status(code: number) {
                  res.statusCode = code;
                  return this;
                },
                json(payload: any) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(payload));
                  return this;
                },
                end() {
                  res.end();
                  return this;
                }
              };

              const customReq: any = {
                method: req.method,
                body: parsedBody
              };

              await handler(customReq, customRes);
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Populate process.env for local development with Vite
  if (env.RESEND_API_KEY && !process.env.RESEND_API_KEY) {
    process.env.RESEND_API_KEY = env.RESEND_API_KEY;
  }
  if (env.NOTIFICATION_EMAIL && !process.env.NOTIFICATION_EMAIL) {
    process.env.NOTIFICATION_EMAIL = env.NOTIFICATION_EMAIL;
  }
  if (env.FROM_EMAIL && !process.env.FROM_EMAIL) {
    process.env.FROM_EMAIL = env.FROM_EMAIL;
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      contactApiDevPlugin()
    ]
  };
});
