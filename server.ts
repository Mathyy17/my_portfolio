import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Endpoint for contact/inquiry form submission
app.post("/api/inquiries", (req, res) => {
  const { name, email, budget, projectType, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill in all required fields (Name, Email, Message)." });
  }

  console.log(`[INQUIRY RECEIVED] from ${name} (${email}) - Budget: ${budget}, Type: ${projectType}`);
  res.json({
    success: true,
    message: "Thank you for your inquiry, Mathilde will get back to you shortly!",
  });
});

// Configure Vite middleware in development or serve static files in production
async function runServer() {
  const distPath = path.join(process.cwd(), "dist");
  const publicPath = path.join(process.cwd(), "public");
  const publicImagesPath = path.join(publicPath, "images");
  const srcAssetsPath = path.join(process.cwd(), "src/assets");

  const staticOptions = {
    setHeaders: (res: express.Response) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  };

  // Serve images and static assets across both development and production
  app.use("/images", express.static(publicImagesPath, staticOptions));
  app.use("/src/assets/images", express.static(publicImagesPath, staticOptions));
  app.use("/src/assets", express.static(srcAssetsPath, staticOptions));
  app.use(express.static(publicPath, staticOptions));

  const isProd = process.env.NODE_ENV !== "development";

  if (isProd) {
    console.log("Starting server in PRODUCTION mode.");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      if (/\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|map)$/i.test(req.path)) {
        return res.status(404).send("Not found");
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    console.log("Starting server in DEVELOPMENT mode with Vite middleware.");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

runServer().catch((error) => {
  console.error("Failed to start full-stack server:", error);
});
