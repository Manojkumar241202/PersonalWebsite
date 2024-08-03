import "./TitleSection.css"
const SectionTitle= ({background_text, grey_text, yellow_text}) => {
    return (
        
        <div class="section-title">
            <span class="subtitle">{background_text}</span>
            <div class="title">
                {grey_text}
                <span>{yellow_text}</span>
            </div>
        </div>
    );
};

export default SectionTitle;