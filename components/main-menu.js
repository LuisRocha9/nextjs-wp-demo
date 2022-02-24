import Link from 'next/link';
import { getMainMenu } from '../lib/api'



export default function MainMenu ({menuItems}) {
    return(
        <nav className="menu--sticky">
            <ul>
                {menuItems.edges.map(({node}) => (
                    <li key={node.id}>
                        <Link href={node.path}>{node.label}</Link>
                    </li>
                    ))
                }
            </ul>
        </nav>
    )
}
