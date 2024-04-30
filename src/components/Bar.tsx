

type BarProps = {
    percentage: number,
    color: string
}

const Bar = (props: BarProps) => {

    const {percentage, color} = props;

    const barStyle = {
        height: `${percentage}%`
    }

    const BarBgClasses: Record<string,string> = {
        'green': 'bg-green-500'
    }
    return (
        <></>
    )
}