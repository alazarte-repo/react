export default function Props(props) {
    console.log(props);
    const {message, name} = props;

    return (
        <div>
        <h1>Hola, {name}!</h1>
        <p>{message}</p>
        </div>
    );
}