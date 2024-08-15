import "./TitleSection.css"
const SectionTitle= ({background_text, grey_text, yellow_text}) => {
    return (
        
        <div className="section-title">
            <span className="subtitle">{background_text}</span>
            <div className="title">
                {grey_text}
                <span>{yellow_text}</span>
            </div>
        </div>
    );
};

export default SectionTitle;