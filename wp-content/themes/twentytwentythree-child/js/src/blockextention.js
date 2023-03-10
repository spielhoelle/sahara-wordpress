import assign from 'lodash.assign';

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

// Enable intro-sequence control on the following blocks
const enableSequenceControlOnBlocks = [
	'core/embed',
];

// Available intro-sequence control options
const sequenceControlOptions = [
	{
		label: __('None'),
		value: '',
	},
	{
		label: __('First'),
		value: 'first',
	},
	{
		label: __('Second'),
		value: 'second',
	},
	{
		label: __('Last'),
		value: 'last',
	},
];

/**
 * Add intro-sequence control attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addSequenceControlAttribute = (settings, name) => {
	// Do nothing if it's another block than our defined ones.
	if (!enableSequenceControlOnBlocks.includes(name)) {
		return settings;
	}

	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign(settings.attributes, {
		sequence: {
			type: 'string',
			default: sequenceControlOptions[0].value,
		},
	});

	return settings;
};

addFilter('blocks.registerBlockType', 'extend-core-block/attribute/sequence', addSequenceControlAttribute);

/**
 * Create HOC to add sequence control to inspector controls of block.
 */
const withSequenceControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		// Do nothing if it's another block than our defined ones.
		if (!enableSequenceControlOnBlocks.includes(props.name)) {
			return (
				<BlockEdit {...props} />
			);
		}

		const { sequence } = props.attributes;

		// add has-sequence-xy class to block
		if (sequence) {
			props.attributes.className = `introvideo-${sequence}`;
		}

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						title={__('Intro Sequence Control')}
						initialOpen={true}
					>
						<SelectControl
							label={__('Sequence')}
							value={sequence}
							options={sequenceControlOptions}
							onChange={(selectedSequenceOption) => {
								props.setAttributes({
									sequence: selectedSequenceOption,
								});
							}}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withSequenceControl');

addFilter('editor.BlockEdit', 'extend-core-block/with-sequence-control', withSequenceControl);

/**
 * Add margin style attribute to save element of block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */
const addSequenceExtraProps = (saveElementProps, blockType, attributes) => {
	// Do nothing if it's another block than our defined ones.
	if (!enableSequenceControlOnBlocks.includes(blockType.name)) {
		return saveElementProps;
	}

	const margins = {
		first: '5px',
		second: '15px',
		last: '30px',
	};

	if (attributes.sequence in margins) {
		// Use Lodash's assign to gracefully handle if attributes are undefined
		assign(saveElementProps, { style: { 'margin-bottom': margins[attributes.sequence] } });
	}

	return saveElementProps;
};

addFilter('blocks.getSaveContent.extraProps', 'extend-core-block/get-save-content/extra-props', addSequenceExtraProps);