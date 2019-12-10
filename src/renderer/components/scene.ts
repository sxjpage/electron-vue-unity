import Vue from "vue";
import { Component } from 'vue-property-decorator';
import  SceneLoader  from '../@types/UnityLoader/index'
@Component
export default class Scene extends Vue {

  mounted()
  {
    console.log("logggggggggg");

    var gameInstance = SceneLoader.Instantiate("gameContainer", "static/scene/Build/Build.json",(gameInstance:any,progress:any) => {
      if (!gameInstance.Module)
        return;
      console.log(progress);
    });
  }

}