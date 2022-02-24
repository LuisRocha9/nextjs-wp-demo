const Search = ({categoriesAndTags, setCategories, setTags, categories, tags}) => {

	var updatedArray = [];

	console.log(categoriesAndTags)
	return (
		<form>
		<div className="row"> 
			<div className="col-xs-6 col-md-4">
				<ul>
					{categoriesAndTags.categories.edges.map(({node}) => (

						<div key={node.id}>
							<input
								type="checkbox"
								id={node.id}
								name={node.slug}
								value={node.categoryId}
								checked={categories.includes(node.slug)}
								onChange={(event) => {
									if(event.target.checked){
										categories.map(d => updatedArray.push(d));
										updatedArray.push(node.slug);
										setCategories(updatedArray)
									} else {
										categories.map(d => updatedArray.push(d));
										const i = updatedArray.indexOf(node.slug);
										updatedArray.splice(i, 1);
										setCategories(updatedArray)
									}
									
									}
								}
							/>
							<label htmlFor={node.slug}>{node.name}</label>
						</div>

						))}
				</ul>
			</div>

			<div className="col-xs-6 col-md-4">
				<ul>
					{categoriesAndTags.tags.edges.map(({node}) => (

						<div key={node.id}>
							<input
								type="checkbox"
								id={node.id}
								name={node.slug}
								value={node.categoryId}
								checked={tags.includes(node.slug)}
								onChange={(event) => {
									if(event.target.checked){
										tags.map(d => updatedArray.push(d));
										updatedArray.push(node.slug);
										setTags(updatedArray)
									} else {
										tags.map(d => updatedArray.push(d));
										const i = updatedArray.indexOf(node.slug);
										updatedArray.splice(i, 1);
										setTags(updatedArray)
									}
									
									}
								}
							/>
							<label htmlFor={node.slug}>{node.name}</label>
						</div>

						))}
				</ul>
			</div>
		</div>
		</form>
		)

}

export default Search;