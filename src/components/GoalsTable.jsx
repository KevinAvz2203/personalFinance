"use client";

import ProgressBar from "@/components/ProgressBar";

export default function GoalsTable() {
  return (
    <>
      <div className="tableBox">
        <div className="goalsTable">
          <div className="goalInstance pt-4">
            <div className="goalTitle">
              <p>Goal 1</p>
              <p>$80,000 of $100,000 MXN</p>
            </div>

            <ProgressBar key={1} completed={80} />
          </div>

          <div className="goalInstance">
            <div className="goalTitle">
              <p>Goal 2</p>
              <p>$50,000 of $100,000 MXN</p>
            </div>

            <ProgressBar key={2} completed={50} />
          </div>

          <div className="goalInstance">
            <div className="goalTitle">
              <p>Goal 3</p>
              <p>$40,000 of $100,000 MXN</p>
            </div>

            <ProgressBar key={3} completed={40} />
          </div>

          <div className="goalInstance">
            <div className="goalTitle">
              <p>Goal 4</p>
              <p>$12,000 of $100,000 MXN</p>
            </div>

            <ProgressBar key={4} completed={12} />
          </div>

          <div className="goalInstance">
            <div className="goalTitle">
              <p>Goal 5</p>
              <p>$24,000 of $100,000 MXN</p>
            </div>

            <ProgressBar key={5} completed={24} />
          </div>

          <div className="goalInstance">
            <div className="goalTitle">
              <p>Goal 6</p>
              <p>$86,000 of $100,000 MXN</p>
            </div>

            <ProgressBar key={6} completed={86} />
          </div>
        </div>
      </div>
    </>
  );
}
