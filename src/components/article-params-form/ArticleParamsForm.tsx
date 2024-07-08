import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Select } from '../select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

export type HandleAppState = (appState: ArticleStateType) => void;

export interface ArticleParamsFormProps {
	handleAppState: HandleAppState;
	appState: ArticleStateType;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { appState, handleAppState } = props;
	const [isEnabled, setIsEnabled] = useState(false);
	const rootRef = useRef(null);
	const handleArrowClick = () => setIsEnabled((isE) => !isE);

	const [formState, setFormState] = useState<ArticleStateType>(appState);

	useOutsideClickClose({
		isOpen: isEnabled,
		rootRef,
		onClose: () => setIsEnabled(!isEnabled),
		onChange: setIsEnabled,
	});

	const handleUpdateState = (propertyName: string) => (value: OptionType) => {
		setFormState((prev) => ({ ...prev, [propertyName]: value }));
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleAppState(formState);
		handleArrowClick();
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleAppState(defaultArticleState);
		setFormState(defaultArticleState);
		handleArrowClick();
	};

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={handleArrowClick} isEnabled={isEnabled} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isEnabled,
				})}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleReset}>
					<h1
						className={clsx(styles.form_text, { [styles.form_h1]: isEnabled })}>
						Задайте параметры
					</h1>
					<div className={styles.form_div}>
						<Select
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={handleUpdateState('fontFamilyOption')}
							title='шрифт'
						/>
					</div>

					<div className={styles.form_div}>
						<RadioGroup
							name='fontSizeOption'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							title='размер шрифта'
							onChange={handleUpdateState('fontSizeOption')}
						/>
					</div>
					<div className={styles.form_div}>
						<Select
							options={fontColors}
							selected={formState.fontColor}
							onChange={handleUpdateState('fontColor')}
							title='цвет шрифта'
						/>
					</div>
					<Separator />
					<div className={styles.form_div}>
						<Select
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={handleUpdateState('backgroundColor')}
							title='цвет фона'
						/>
					</div>

					<div className={styles.form_div}>
						<Select
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={handleUpdateState('contentWidth')}
							title='ширина контента'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
