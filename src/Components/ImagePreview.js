
import { Context } from '../Context'
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        backgroundColor: theme.palette.background.paper,
        // border: "1px red solid",
        height: "30vh",

    },
    imgContainer: {
        maxWidth: "50%",
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
    },
    img: {
        // width: 190,
        height: "30vh",
        objectFit: "cover",
        border: "#888888 solid 1px",
        borderRadius: 10,
        margin: 1
    }
}));

const ImagePreview = ({ id }) => {
    const myContext = useContext(Context);
    const classes = useStyles();
    console.log(myContext.Img);
    console.log(id)
    return (
        <div className={classes.root}>
            <div className={classes.imgContainer}>

                {id && myContext.Img[id] && Object.values(myContext.Img[id]).map((item, index) => (

                    <img src={URL.createObjectURL(item)} alt={""} key={index} className={classes.img} />

                ))}
            </div>

        </div>
    );
}

export default ImagePreview
