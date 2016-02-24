<GameFile>
  <PropertyGroup Name="sc_initial" Type="Scene" ID="ca0faeba-9be5-487b-bfe1-d0fdf368f936" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="240" Speed="1.0000" ActivedAnimationName="main_anim">
        <Timeline ActionTag="-1155181130" Property="Position">
          <PointFrame FrameIndex="0" X="400.0000" Y="240.0000">
            <EasingData Type="2" />
          </PointFrame>
          <PointFrame FrameIndex="60" X="400.0000" Y="240.0000">
            <EasingData Type="1" />
          </PointFrame>
          <PointFrame FrameIndex="120" X="400.0000" Y="240.0000">
            <EasingData Type="0" />
          </PointFrame>
        </Timeline>
        <Timeline ActionTag="-1155181130" Property="Scale">
          <ScaleFrame FrameIndex="0" X="2.0000" Y="2.0000">
            <EasingData Type="2" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="60" X="2.0000" Y="2.0000">
            <EasingData Type="1" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="120" X="2.0000" Y="2.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="-1155181130" Property="RotationSkew">
          <ScaleFrame FrameIndex="0" X="0.0000" Y="0.0000">
            <EasingData Type="2" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="60" X="0.0000" Y="0.0000">
            <EasingData Type="1" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="120" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="-1155181130" Property="Alpha">
          <IntFrame FrameIndex="0" Value="0">
            <EasingData Type="2" />
          </IntFrame>
          <IntFrame FrameIndex="60" Value="255">
            <EasingData Type="1" />
          </IntFrame>
          <IntFrame FrameIndex="120" Value="0">
            <EasingData Type="0" />
          </IntFrame>
        </Timeline>
        <Timeline ActionTag="-1486092494" Property="Position">
          <PointFrame FrameIndex="120" X="400.0000" Y="240.0000">
            <EasingData Type="2" />
          </PointFrame>
          <PointFrame FrameIndex="180" X="400.0000" Y="240.0000">
            <EasingData Type="1" />
          </PointFrame>
          <PointFrame FrameIndex="240" X="400.0000" Y="240.0000">
            <EasingData Type="0" />
          </PointFrame>
        </Timeline>
        <Timeline ActionTag="-1486092494" Property="Scale">
          <ScaleFrame FrameIndex="120" X="0.3000" Y="0.3000">
            <EasingData Type="2" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="180" X="0.3000" Y="0.3000">
            <EasingData Type="1" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="240" X="0.3000" Y="0.3000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="-1486092494" Property="RotationSkew">
          <ScaleFrame FrameIndex="120" X="0.0000" Y="0.0000">
            <EasingData Type="2" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="180" X="0.0000" Y="0.0000">
            <EasingData Type="1" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="240" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="-1486092494" Property="Alpha">
          <IntFrame FrameIndex="120" Value="0">
            <EasingData Type="2" />
          </IntFrame>
          <IntFrame FrameIndex="180" Value="255">
            <EasingData Type="1" />
          </IntFrame>
          <IntFrame FrameIndex="240" Value="0">
            <EasingData Type="0" />
          </IntFrame>
        </Timeline>
      </Animation>
      <AnimationList>
        <AnimationInfo Name="main_anim" StartIndex="0" EndIndex="240">
          <RenderColor A="150" R="255" G="228" B="196" />
        </AnimationInfo>
      </AnimationList>
      <ObjectData Name="Scene" Tag="3" ctype="GameNodeObjectData">
        <Size X="800.0000" Y="480.0000" />
        <Children>
          <AbstractNodeData Name="Image_1" ActionTag="665371363" Tag="4" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" BottomMargin="0.0000" Scale9Width="1" Scale9Height="1" ctype="ImageViewObjectData">
            <Size X="800.0000" Y="480.0000" />
            <AnchorPoint />
            <Position Y="0.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition Y="0.0000" />
            <PreSize X="1.0000" Y="1.0000" />
            <FileData Type="Normal" Path="visualcontent/ui/whitedot.png" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="el_splashscreen_1" ActionTag="-1155181130" Alpha="0" Tag="5" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="318.5000" RightMargin="318.5000" TopMargin="173.0000" BottomMargin="173.0000" ctype="SpriteObjectData">
            <Size X="163.0000" Y="134.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="400.0000" Y="240.0000" />
            <Scale ScaleX="2.0000" ScaleY="2.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="0.2037" Y="0.2792" />
            <FileData Type="Normal" Path="visualcontent/brands/el_splashscreen.png" Plist="" />
            <BlendFunc Src="1" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="cocos_splashscreen_3" ActionTag="-1486092494" Alpha="0" Tag="7" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-500.0000" RightMargin="-500.0000" TopMargin="4.0000" BottomMargin="4.0000" ctype="SpriteObjectData">
            <Size X="1800.0000" Y="472.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="400.0000" Y="240.0000" />
            <Scale ScaleX="0.3000" ScaleY="0.3000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="2.2500" Y="0.9833" />
            <FileData Type="Normal" Path="visualcontent/brands/cocos_splashscreen.png" Plist="" />
            <BlendFunc Src="1" Dst="771" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>