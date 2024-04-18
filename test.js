function calculateDistance(
  lat1,
  lon1,
  lat2,
  lon2
) {
  const R = 6371; // Radius of the Earth in kilometers
  const φ1 = lat1 * Math.PI / 180; // Convert degrees to radians
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c * 1000; // Convert to meters
  return distance;
}

// test:
console.log(calculateDistance(58.404662, 15.579861, 58.434830, 15.593130)); // 278.45817507541943

