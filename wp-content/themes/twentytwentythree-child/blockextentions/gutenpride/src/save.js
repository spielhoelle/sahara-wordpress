import { useBlockProps } from '@wordpress/block-editor'

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'jobs',
  })
  return (
    <div {...blockProps}>
      <table>
        {attributes.sequence.map((job) => (
          <tr>
            <td>
              <a href={job.link}>
                <h2 key={job.link}>
                  {job.title}
                </h2>
              </a>
            </td>
            <td>
					Arrow
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}
