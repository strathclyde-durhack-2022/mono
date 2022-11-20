import { Button,TextField } from "@mui/material";

export default function Game(props: {
    Symbols: Array<string>; 
  }){

    return(
        <>
         {props.Symbols.map((elem,index) => {
                //   let x;
                //   if (elem.guess==elem.result){ //indicate when user input is correct
                //     x = <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                //             Correct
                //         </span>
                //   } else{
                //     x = <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-green-800">
                //             Wrong
                //         </span>
                //   }
                //   key+=1;
                  return (
                    <TextField id="outlined-basic" label={elem+" Rank "} variant="outlined" key={index}/>
                    
                //   <tr key={elem.coin}>
                //     <td className="px-6 py-4 whitespace-nowrap">
                //       <div className="text-lg font-medium text-gray-500">{elem.coin}</div>
                //     </td>
                //     <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{elem.guess}</td>
                //     <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{elem.result}</td>
                //     <td className="px-6 py-4 whitespace-nowrap">
                //       {x}
                //     </td>
                //   </tr>
                 )})}
                 <Button variant="contained">Submit data and play game</Button>

        </>
    )
}
