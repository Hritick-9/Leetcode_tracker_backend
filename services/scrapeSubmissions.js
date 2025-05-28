import fetch from 'node-fetch';

async function getRecentSubmissions(username) {
  const query = {
    query: `
      query recentAcSubmissions($username: String!) {
        recentAcSubmissionList(username: $username) {
          id
          title
          titleSlug
          timestamp
          lang
          status
        }
      }
    `,
    variables: { username }
  };

  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  });

  const json = await response.json();
  console.log("GraphQL response:", JSON.stringify(json, null, 2));

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  if (!json.data || !json.data.recentAcSubmissionList) {
    throw new Error("No submissions found or invalid user.");
  }

  return json.data.recentAcSubmissionList.map(sub => ({
    id: sub.id,
    title: sub.title,
    status: sub.status,
   
    titleSlug: sub.titleSlug,
    language: sub.lang,
    time: new Date(sub.timestamp * 1000).toLocaleString(),
  }));
}

export default getRecentSubmissions;
