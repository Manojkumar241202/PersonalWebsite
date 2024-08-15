import "./SwipeButton.css"
const SwipeButton = ({button_text, icon, onClick= null}) =>{

    return (
        <div className='arrowSwipeButton' onClick={onClick}>
            {button_text}
            <i className={icon}></i>
        </div>
    )
};

export default SwipeButton;