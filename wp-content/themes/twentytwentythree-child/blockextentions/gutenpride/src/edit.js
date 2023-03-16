import { __ } from '@wordpress/i18n'
import { useSelect } from '@wordpress/data'
import {
	useBlockProps, InspectorControls,
} from '@wordpress/block-editor'
import {
	SelectControl,
	PanelBody,
} from '@wordpress/components'

export default function Edit(props) {
	const {
		attributes,
		setAttributes,
	} = props
	const posts = useSelect((select) => select('core').getEntityRecords('postType', 'attachment'), [])

	console.log('posts', posts)
	const onChangeContent = (jobPageIds) => {
		const numberedJobpageIds = jobPageIds.map((j) => Number(j))
		if (jobPageIds.length !== 0) {
			const sequence = posts.filter((p) => numberedJobpageIds.includes(p.id))
			setAttributes({ sequence: sequence.map(p => ({ id: p.id, link: p.source_url, title: p.title.raw })) })
		}
	}
	const blockProps = useBlockProps({
		className: 'jobs',
	})
	return (
		<div {...blockProps}>
			{!attributes.sequence || attributes.sequence.length === 0 && (
				<h2>Select some Job pages on the left</h2>
			)}
			<table>
				{posts && attributes.sequence.length && attributes.sequence.map((job) => (
					<video width='320' height='240' class='d-none overlay w-100 h-100' autoplay loop>
						<source src='wp-content/themes/twentytwentytwo-child/smoke.mp4' type='video/mp4' />
						<source src='movie.ogg' type='video/ogg' />
						Your browser does not support the video tag.
					</video>
					// <tr>
					// 	<td>
					// 		<a href={job.link}>
					// 			<h2 key={job.link}>
					// 				{job.title}
					// 			</h2>
					// 		</a>
					// 	</td>
					// 	<td>
					// 		Arrow
					// 	</td>
					// </tr>
				))}
			</table>
			<InspectorControls>
				<PanelBody title={__('General', 'gutenberg')} initialOpen>
					<SelectControl
						style={{ 'height': 100 }}
						multiple
						value={(attributes.sequence || []).map((j) => j.id)}
						label="Pages"
						options={(posts || []).filter((p) => p.mime_type === "video/mp4").map((p) => ({ label: p.title.raw, value: p.id }))}
						onChange={(job) => {
							onChangeContent(job)
						}}
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	)
}
