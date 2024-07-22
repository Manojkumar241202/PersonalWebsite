import "./SwipeButton.css"
const SwipeButton = ({button_text, icon}) =>{

    return (
        <div className='arrowSwipeButton'>
            {button_text}
            <i className={icon}></i>
        </div>
    )
};

export default SwipeButton;