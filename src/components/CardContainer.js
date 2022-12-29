import React from "react";
import Card from "./Card";

const CardContainer = () => {
  return (
    <div>
      <h1 class="pt-20 font-medium leading-tight text-5xl mt-0 mb-2 text-black-600 text-center">Programming Questions</h1>
      <div className="space-x-2 pt-20 grid lg:grid-cols-4 gap-20">
        <Card heading="All Questions" />
        <Card heading="Loops" />
        <Card heading="Arrays" />
        <Card heading="Strings" />
        <Card heading="Recursion" />
        <Card heading="Stack" />
        <Card heading="Queue" />
        <Card heading="Linked List" />
      </div>
    </div>
  );
};

export default CardContainer;
