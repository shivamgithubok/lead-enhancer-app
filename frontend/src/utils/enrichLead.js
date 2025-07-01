export async function enrichLead(id) {
  try {
    const response = await fetch(`http://localhost:8000/leads/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const enrichedData = await response.json();
    return enrichedData;
  } catch (error) {
    console.error('Error enriching lead:', error);
    throw error;
  }
}
  