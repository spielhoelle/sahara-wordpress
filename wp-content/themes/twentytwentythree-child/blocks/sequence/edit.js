import { __ } from '@wordpress/i18n'
import { useSelect, useDispatch } from '@wordpress/data'
import React, { } from "react";
import {
  useBlockProps, InspectorControls,
} from '@wordpress/block-editor'
import {
  SelectControl,
  PanelBody
} from '@wordpress/components'

export default function Edit({ attributes, setAttributes, clientId }
) {
  const {
    getBlockRootClientId,
    getBlockIndex,
    getBlocks,
  } = useSelect('core/block-editor');

  const { moveBlockToPosition } = useDispatch('core/block-editor');
  function demoMoveBlock() {
    const blocks = getBlocks();
    if (blocks.length < 2) {
      alert('Stop playing now; there\'s only this block in the editor!');
      return;
    }
    const blockIndex = blocks.findIndex(b => b.name === "create-block/tmy-sequence")
    if (blockIndex !== 0) {
      let targetBlock = blocks.splice(blockIndex, 1)[0]
      if (clientId === targetBlock.clientId) {
        targetBlock = blocks.shift();
      }
      const sourceClientId = clientId;
      const targetClientId = targetBlock.clientId;
      const fromRootClientId = getBlockRootClientId(sourceClientId);
      const toRootClientId = getBlockRootClientId(targetClientId);
      const targetIndex = getBlockIndex(targetClientId);
      moveBlockToPosition(sourceClientId, fromRootClientId, toRootClientId, targetIndex);
    }
  }
  let posts = useSelect((select) => select('core').getEntityRecords('postType', 'attachment'), [])

  const onChangeContent = (videoposition, attachmentId) => {
    const sequence = [...attributes.sequence]
    const p = posts.find(p => p.id == attachmentId)
    sequence[videoposition] = { id: attachmentId, source_url: p.source_url, title: p.title.raw }
    setAttributes({ sequence })
    demoMoveBlock()
  }

  const blockProps = useBlockProps({
    className: 'sequence',
  })

  const options = [{ label: "Not set", value: "" }, ...(posts || []).filter((p) => p.mime_type === "video/mp4").map((p, i) => ({ label: i + " - " + p.title.raw, value: p.id }))]
  return (
    <div {...blockProps}>
      {!attributes.sequence || attributes.sequence.length === 0 && (
        <h2>Select the videos for the loop</h2>
      )}
      {attributes.sequence.map((seq, i) => (
        <video
          key={i + seq.id}
          width='320' height='240' class={`overlay w-100 h-auto`} loop>
          <source src={seq.source_url} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      ))}

      <InspectorControls>
        <PanelBody title={__('General', 'gutenberg')} initialOpen>
          <SelectControl
            value={attributes.sequence[0]?.id}
            label="Video 1"
            options={options}
            onChange={(attachmentId) => {
              onChangeContent(0, attachmentId)
            }}
            __nextHasNoMarginBottom
          />
          <SelectControl
            value={attributes.sequence[1]?.id}
            label="Video 2"
            options={options}
            onChange={(attachmentId) => {
              onChangeContent(1, attachmentId)
            }}
            __nextHasNoMarginBottom
          />
          <SelectControl
            value={attributes.sequence[2]?.id}
            label="Video 3"
            options={options}
            onChange={(attachmentId) => {
              onChangeContent(2, attachmentId)
            }}
            __nextHasNoMarginBottom
          />
        </PanelBody>
      </InspectorControls>
    </div>
  )
}
