import Image from "next/image";
import optionDots from "/public/assets/icons/optionDots.png";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function SavingGoals({ User }) {
  return (
    <>
      <div className="savingGoals">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Saving Goals</h1>
          <Image src={optionDots} alt="add charge icon" />
        </div>

        <div className="grid grid-cols-2 gap-4"></div>

        <Doughnut
          data={{
            labels: ["Yes", "No"],
            datasets: [
              {
                data: [300, 50],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"],
              },
            ],
          }}
          options={{
            elements: {
              center: {
                color: "#FF6384", // Default is #000000
                fontStyle: "Arial", // Default is Arial
                sidePadding: 20, // Default is 20 (as a percentage)
                minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
                lineHeight: 25, // Default is 25 (in px), used for when text wraps
              },
            },
          }}
          plugins={[
            {
              id: "textCenter",
              beforeDatasetsDraw(chart, args, pluginOptions) {
                const { ctx, data } = chart;

                ctx.save();
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseLine = "middle";
                ctx.fillText(
                  "Viaje a Alemania",
                  chart.getDatasetMeta(0).data[0].x,
                  chart.getDatasetMeta(0).data[0].y
                );
              },
            },
          ]}
        />

        {/* <div className="grid grid-cols-2 gap-4">
          <div>
            <Image src={goalPercentage} alt="goal % icon" />
            <p className="text-center">PlayStation 5</p>
          </div>
          <div>
            <Image src={goalPercentage} alt="goal % icon" />
            <p className="text-center">PlayStation 5</p>
          </div>
          <div>
            <Image src={goalPercentage} alt="goal % icon" />
            <p className="text-center">PlayStation 5</p>
          </div>
          <div>
            <Image src={goalPercentage} alt="goal % icon" />
            <p className="text-center">PlayStation 5</p>
          </div>
        </div> */}
      </div>
    </>
  );
}
