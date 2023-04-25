import { useBlockProps } from '@wordpress/block-editor'

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'sequence',
  })
  return (
    <div {...blockProps}>
      {attributes.sequence.map((seq) => (
        <video width='320' height='240' class='overlay w-100 h-auto' autoplay loop>
          <source src={seq.source_url} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      ))}
    </div>
  )
}
