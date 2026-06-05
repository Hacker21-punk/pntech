const apiKey = "re_aoJSufDr_Gras3UhVjo8pTgfL6wqnrLjF";

async function testSubdomainSend() {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "PN Technologies <notifications@send.pntech.in>",
        to: "business@pntech.in",
        subject: "Test Subdomain Email - Bypass Spoofing Filter",
        html: "<p>This is a test email sent from <strong>notifications@send.pntech.in</strong> to <strong>business@pntech.in</strong> to test bypassing local domain spoofing filters.</p>",
      }),
    });

    console.log("Status:", response.status);
    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

testSubdomainSend();
