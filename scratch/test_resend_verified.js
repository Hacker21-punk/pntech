const apiKey = 're_aoJSufDr_Gras3UhVjo8pTgfL6wqnrLjF';

async function testEmail() {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'PN Technologies <business@pntech.in>',
        to: 'business@pntech.in',
        subject: 'Test Email - Domain Verified',
        html: '<p>This is a test email sent from the verified <strong>pntech.in</strong> domain using Resend.</p>'
      })
    });

    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testEmail();
