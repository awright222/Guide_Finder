const Table = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Service</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Experience Level</th>
                </tr>
            </thead>
            <tbody>
                {data.map(service => (
                    <tr key={service.id}>
                        <td>{service.title}</td>  
                        <td>{service.type}</td>  
                        <td>{`${service.state}, ${service.country}`}</td> 
                        <td>{service.experience_level || 'N/A'}</td>  
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
