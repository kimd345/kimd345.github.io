// Only included snippet that enables infinite scroll

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = () => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            myActivities: {
              merge(existing, incoming, { readField }) {
                const activities = existing ? { ...existing.activities } : {};
                incoming.activities.forEach((activity) => {
                  activities[readField("id", activity)] = activity;
                });
                return {
                  activities,
                  pageInfo: {
                    nextPageCursor: incoming.pageInfo.nextPageCursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
              read(existing) {
                if (existing) {
                  return {
                    activities: Object.values(existing.activities),
                    pageInfo: existing.pageInfo,
                  };
                }
              },
            },
          },
        },
      },
    }),
  });
};

export default client;
