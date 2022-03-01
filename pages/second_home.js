import MainMenu from '../components/main-menu';
import {getAllProjects, getMainMenu} from '../lib/api';
import Link from 'next/link';
import glidejs from '@glidejs/glide';

const SecondHome = ({allProjects, menuItems}) => {
	console.log(glidejs)
	return (
		<main className={"max-container"}>
			<MainMenu menuItems={menuItems} />
			<div className="row thumbnails">
				{allProjects.edges.map(({node}) => (
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
				))}
			</div>
		</main>

		)
}

export default SecondHome;

export async function getStaticProps() {
    const allProjects = await getAllProjects();
   	const menuItems = await getMainMenu();

    return {
        props: { allProjects, menuItems },
        revalidate: 1
    }
}
