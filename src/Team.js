const Team = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
            <h2>{props.city}</h2>
            <h2>{props.player}</h2>
        </div>
    );
};

export default Team;