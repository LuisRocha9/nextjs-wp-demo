import Link from 'next/link';


const ProjectsList = ({projects}) => {

	return (
		<div>
			
			<div className="row thumbnails">
				{projects.edges.map(({node}) => (

					<div key={node.id} className="col-xs-6 col-md-4">
                            <Link className="link" href={`/project/${node.slug}`}>
	                            <a aria-label={node.title}>
	                                <div className="thumbnail">
	                                    <div className="thumbnail__img">
	                                      <img src={node.featuredImage.node.sourceUrl} alt="Thumbnail"/>
	                                    </div>
	                                    <div className="thumbnail__title">

	                                        <b>{node.title}</b><br />
	                                        <div dangerouslySetInnerHTML={{__html : node.excerpt}}/>

	                                    </div>
	                                </div>
	                            </a>
                            </Link>
                        </div>
					))

				}
			</div>

		</div>
		)

}

export default ProjectsList;