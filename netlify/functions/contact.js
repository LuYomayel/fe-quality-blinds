export const handler = async (event) => {
  // Solo permitir POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Configurar CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Manejar preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    const formData = JSON.parse(event.body);

    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Name, email, and message are required",
          success: false,
        }),
      };
    }

    // Log para monitoreo (en producción esto se enviaría a un servicio de email)
    console.log("New contact form submission:", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toISOString(),
    });

    // Simulación de envío de email exitoso
    // En producción, aquí integrarías con SendGrid, Mailgun, etc.

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Thank you for your message. We will get back to you soon!",
      }),
    };
  } catch (error) {
    console.error("Error processing contact form:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal server error",
        success: false,
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      }),
    };
  }
};
