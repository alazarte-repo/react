const Button = ({ text = 'Click me', onClick }) => {
    return (
        <button onClick={onClick}>{text}</button>
    );
};

export default Button;