const apiKey = "re_aoJSufDr_Gras3UhVjo8pTgfL6wqnrLjF";

async function testExternalSend() {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "PN Technologies <business@pntech.in>",
        to: "priyu7092@gmail.com",
        subject: "Test Email to External Address",
        html: "<p>This is a test email sent from the verified <strong>pntech.in</strong> domain to an external Gmail address.</p>",
      }),
    });

    console.log("Status:", response.status);
    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

testExternalSend();
