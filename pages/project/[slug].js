import { useRouter } from 'next/router'
import ErrorPage from 'next/error';
import MainMenu from '../../components/main-menu';
import {getAllProjectsWithSlug, getProjectBySlug, getMainMenu } from '../../lib/api'

const Project = ({project, menuItems}) => {
  const router = useRouter();

  if (!router.isFallback && !project?.slug) {
   return <ErrorPage statusCode={404} />
 }
 return(
        <div>
          <MainMenu menuItems={menuItems}/>
          {project !== undefined ? <article>
                  <div className="row">
                      <div className="col-xs-12">
                          <h1 dangerouslySetInnerHTML={{__html: project.title}}/>
                      </div>
                  </div>
                  <div className="row article">
                      <div className="col-xs-12 col-md-8">
                          <div className="article__content" dangerouslySetInnerHTML={{__html: project.content}}/>
                      </div>
                      <div className="col-xs-12 col-md-3 col-md-offset-1">
                          <div className="article__sidebar">
                              <div className="author__image">

                                    {project.projectInfo.author.authorInfo.photo ?
                                      <img src={project.projectInfo.author.authorInfo.photo.sourceUrl} alt={project.projectInfo.author.title}/> :
                                      null
                                    }

                              </div>
                              <div className="author__bio">
                                  <div dangerouslySetInnerHTML={{__html: project.projectInfo.author.authorInfo.biography}}/>
                              </div>
                              <div className="article__tags">
                                  {project.categories.nodes.map(category => (
                                      <a key={category.id} href="#" className="button-tag">{category.name}</a>
                                  ))}
                              </div>
                              <div className="article__tags">
                                  {project.tags.nodes.map(tag => (
                                      <a key={tag.id} href="#" className="button-tag">{tag.name}</a>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>

              </article> : null}
            </div>
  )
}

export default Project;

export async function getStaticProps({ params }) {
  const data = await getProjectBySlug(params.slug);
  const menuItems = await getMainMenu();

  return {
    props: {
      project: data,
      menuItems
    },
  }
}

export async function getStaticPaths() {
  const allProjects = await getAllProjectsWithSlug()

  return {
    paths: allProjects.edges.map(({ node }) =>`/project/${node.slug}`) || [],
    fallback: false,
  }
}
