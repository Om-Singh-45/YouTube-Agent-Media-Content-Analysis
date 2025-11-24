// Simple JavaScript test to check frontend-backend communication
console.log("Testing frontend-backend communication...");

// Test the backend API directly
fetch('http://localhost:5000/api/analyze-video', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    youtube_url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw'
  })
})
.then(response => {
  console.log('Response status:', response.status);
  console.log('Response headers:', [...response.headers.entries()]);
  return response.json();
})
.then(data => {
  console.log('Response data:', data);
  
  // Check if this is placeholder data
  if (data.summary && data.summary.includes('placeholder') || data.summary.includes('simulated')) {
    console.log('❌ Still receiving placeholder data');
  } else {
    console.log('✅ Receiving real AI-generated data');
    console.log('Summary length:', data.summary ? data.summary.length : 0);
    console.log('Number of chapters:', data.chapters ? data.chapters.length : 0);
    console.log('Number of themes:', data.themes ? data.themes.length : 0);
  }
})
.catch(error => {
  console.error('Error:', error);
});