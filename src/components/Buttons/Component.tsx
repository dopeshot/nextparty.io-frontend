
type Base = {
	color: string
}

type OptionOne = {
	to: string
} & Base

type OptionTwo = {
	link: string
	linkNewTab: boolean
} & Base

type ComponentProps = OptionOne | OptionTwo

export const Button: React.FC<ComponentProps> = (props) => {
	return (<>
		{/* {'link' in props ? <Link newTab={props.linkNewTab}>...</Link> : props.to && <Button>...</Button>} */}
	</>)
}
