import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const FontAwesomeBase = ({iconName, ...restProps}) => {
    return <>
        <FontAwesomeIcon icon={["fa", iconName]}
            {...restProps} />
    </>
};

export default FontAwesomeBase;