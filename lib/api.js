const API_URL = "https://next-js-wordpress.previews.mariaadelaide.com/graphql";

async function fetchAPI(query, { variables } = {}) {
    const headers = { 'Content-Type': 'application/json' }

    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
        headers[
        'Authorization'
        ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
    }

    const res = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables,
        }),
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json.data
}

export async function getAllProjects() {
    const data = await fetchAPI(`
        query GetProjects {
          projects {
            edges {
              node {
                title
                date
                excerpt
                slug
                id
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                categories {
                  nodes {
                    categoryId
                    slug
                  }
                }
                tags {
                  nodes {
                    tagId
                    slug
                  }
                }
              }
            }
          }
        }

    `
    )
        return data?.projects ? data.projects : null;
}

export async function getAllProjectsWithSlug() {
  const data = await fetchAPI(`
      {
          projects {
            edges {
              node {
                slug
                }
            }
        }
    }
    `)
      return data?.projects ? data.projects : null
}


export async function getProjectBySlug(slug) {
    const data = await fetchAPI(`
        query GetProjectBySlug($id: ID!) {
          project(id: $id, idType: SLUG) {
            content
            slug
            title
            tags {
              nodes {
                name
                id
              }
            }
            projectInfo {
              author {
                ... on Author {
                  id
                  title
                  authorInfo {
                    photo {
                      sourceUrl
                    }
                    biography
                  }
                }
              }
            }
            categories {
              nodes {
                id
                name
              }
            }
          }
        }


        `,
        {
            variables: {
                id: slug
            },
        }
    )
    return data?.project ? data.project : null;
}

export async function getMainMenu() {
    const data = await fetchAPI(`
        query GetMainMenu {
            menuItems {
                edges {
                    node {
                        id
                        path
                        label
                    }
                }
            }
        }

        `
        )
    return data?.menuItems ? data.menuItems : null;
}


export async function getAllCategoriesAndTags() {

    const data = await fetchAPI(`
        query GetAllCategoriesAndTags {
          categories {
            edges {
              node {
                id
                categoryId
                slug
                name
              }
            }
          }
          tags {
            edges {
              node {
                id
                tagId
                slug
                name
              }
            }
          }
        }

        `
        )
    return {
        categories: data?.categories,
        tags: data?.tags

    };

}
