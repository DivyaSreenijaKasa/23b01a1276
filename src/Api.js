const BASE_URL = 'http://4.224.186.213/evaluation-service';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM2IwMWExMmE0QHN2ZWN3LmVkdS5pbiIsImV4cCI6MTc4MjM4MzIxOCwiaWF0IjoxNzgyMzgyMzE4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYmQ1MDE3MzAtY2JjNi00NTFkLWJlMDYtZjQwYzkwMmI2YTVhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWFyYWdhbmkgY2hhdHVyeWEga2VlcnRoaSIsInN1YiI6IjQwMTIyMmU0LTYyNDUtNDZkZi04ZmM2LTNlYmE5N2ZmOGExMCJ9LCJlbWFpbCI6IjIzYjAxYTEyYTRAc3ZlY3cuZWR1LmluIiwibmFtZSI6Im1hcmFnYW5pIGNoYXR1cnlhIGtlZXJ0aGkiLCJyb2xsTm8iOiIyM2IwMWExMmE0IiwiYWNjZXNzQ29kZSI6ImFoWGp2cCIsImNsaWVudElEIjoiNDAxMjIyZTQtNjI0NS00NmRmLThmYzYtM2ViYTk3ZmY4YTEwIiwiY2xpZW50U2VjcmV0Ijoiek1tdkpiVFVUTnpHakViTiJ9.zmsLF7VYNJPWYX5Yft5X78ZeRq8ubG5ec3JTTjWfeXg'; // 👈 PASTE YOUR POSTMAN TOKEN HERE

// Reusable Logging Middleware Function
export async function logEvent(level, packageName, message) {
  try {
    await fetch(`${BASE_URL}/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        stack: "frontend",
        level: level,
        package: packageName,
        message: message
      })
    });
  } catch (err) {
    console.error("Logging failed:", err);
  }
}

// Fetch Notifications Function
export async function fetchNotifications() {
  try {
    await logEvent("info", "api", "Attempting to fetch notifications from evaluation server");
    const response = await fetch(`${BASE_URL}/notifications`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    });
    const data = await response.json();
    await logEvent("info", "api", "Successfully fetched notifications data");
    return data.notifications;
  } catch (err) {
    await logEvent("error", "api", `Failed to fetch notifications: ${err.message}`);
    throw err;
  }
}