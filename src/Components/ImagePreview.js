
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
        width: 190,
        height: "30vh",
        objectFit: "cover",
        border: "#888888 solid 1px",
        borderRadius: 10,
        margin: 1
    }
}));

const ImagePreview = (files) => {
    const myContext = useContext(Context);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.imgContainer}>

                {Object.values(myContext.Img).map((item, index) => (

                    <img src={URL.createObjectURL(item)} alt={""} key={index} className={classes.img} />

                ))}
            </div>

        </div>
    );
}

export default ImagePreview
