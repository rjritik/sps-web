const Section = ({ children, className }) => {
    return (
        <section className={`section ${className ? className : ""}`}>
            {children}
        </section>
    );
};

export default Section;
