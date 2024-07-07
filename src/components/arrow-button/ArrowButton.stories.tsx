import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	argTypes: { isEnabled: { control: 'boolean' } },
	render: ({ isEnabled }) => {
		return (
			<>
				<ArrowButton onClick={action('opened')} isEnabled={isEnabled} />
			</>
		);
	},
};
