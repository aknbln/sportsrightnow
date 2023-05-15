import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
// import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'



const CategoryCard = (props) => {
    return (
        // <Card>
        //     <Link to={props.linkURL} style={{ textDecoration: 'none', color: 'black'}}>
        //         <CardActionArea>
        //             <CardMedia
        //                 sx={{ height: 200 }}
        //                 image={props.imgURL}
        //                 title={props.title}
        //             />
        //             <CardContent>
        //                 <Typography variant="h5" component="div">
        //                     {props.title}
        //                 </Typography>
        //                 <Typography variant="body2">
        //                     {props.text}
        //                 </Typography>
        //             </CardContent>
                    
        //         </CardActionArea>
        //         </Link>
        // </Card>

        <Card>
            <Card.Img
                variant='top'
                alt="Card image cap"
                src={props.imgURL}
                width="100%"
            />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.text}</Card.Text>
                
                <Link to={props.linkURL}>
                    <Button id="btn">More Info</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default CategoryCard