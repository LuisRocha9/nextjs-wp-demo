import MainMenu from '../components/main-menu';
import {getAllProjects, getMainMenu} from '../lib/api';
import Link from 'next/link';
import dynamic from 'next/dynamic';


const DynamicGlide = dynamic(() => import('../components/glide-component'))
const DynamicAnime = dynamic(() => import('../components/anime-component'))


const SecondHome = ({allProjects, menuItems}) => {
	return (
		
		<main className={"max-container"}>
		<DynamicGlide />
		<DynamicAnime />

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
