async function fetchDataAndCalculateTop4Topics() {
  try {
    const response = await fetch('http://localhost:5000/api/data'); 
    const data = await response.json();

    console.log("ok");

    const currentYear = new Date().getFullYear();
    const tenYearsAgo = currentYear - 10;

    const topicCounts = {};

    data.forEach(item => {
      const addedYear = new Date(item.added).getFullYear();
      if (addedYear >= tenYearsAgo) {
        if (topicCounts[item.topic]) {
          topicCounts[item.topic]++;
        } else {
          topicCounts[item.topic] = 1;
        }
      }
    });

    const totalEntriesInLast10Years = Object.values(topicCounts).reduce((sum, count) => sum + count, 0);
    const topicPercentages = {};

    for (const [topic, count] of Object.entries(topicCounts)) {
      topicPercentages[topic] = (count / totalEntriesInLast10Years);
    }

    const sortedTopics = Object.entries(topicPercentages).sort(([, percentA], [, percentB]) => percentB - percentA);
    const top4TopicsArray = sortedTopics.slice(0, 4); // Get top 4 topics

    // Convert array to an object
    const top4Topics = top4TopicsArray.reduce((obj, [topic, percentage]) => {
      obj[topic] = percentage;
      return obj;
    }, {});

    console.log('Top 4 Topics in Last 10 Years:', top4Topics);

    // Convert the object to an array to access specific indices
    const top4TopicsArrayWithIndex = Object.entries(top4Topics);

    // Access specific elements
    const firstElement = top4TopicsArrayWithIndex[0];
    const thirdElement = top4TopicsArrayWithIndex[2];
    const fourthElement = top4TopicsArrayWithIndex[3];
    const fifthElement = top4TopicsArrayWithIndex[4]; // Note: This will be `undefined` if there are only 4 elements

    console.log('1st Element:', firstElement ? `Key: ${firstElement[0]}, Value: ${firstElement[1]}` : 'No 1st Element');
    console.log('3rd Element:', thirdElement ? `Key: ${thirdElement[0]}, Value: ${thirdElement[1]}` : 'No 3rd Element');
    console.log('4th Element:', fourthElement ? `Key: ${fourthElement[0]}, Value: ${fourthElement[1]}` : 'No 4th Element');
    console.log('5th Element:', fifthElement ? `Key: ${fifthElement[0]}, Value: ${fifthElement[1]}` : 'No 5th Element');

    return {
      totalEntriesInLast10Years,
      top4Topics
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Example usage
fetchDataAndCalculateTop4Topics()
  .then(results => {
    if (results) {
      console.log('Total Entries in Last 10 Years:', results.totalEntriesInLast10Years);
      console.log('Top 4 Topics:', results.top4Topics);
    }
  })
  .catch(error => {
    console.error('Error in fetch operation:', error);
  });
