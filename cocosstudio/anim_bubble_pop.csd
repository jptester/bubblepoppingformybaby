<GameFile>
  <PropertyGroup Name="anim_bubble_pop" Type="Node" ID="254200a1-1d27-492a-86e8-edf2b772d3e7" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="40" Speed="1.0000">
        <Timeline ActionTag="1824560160" Property="Position">
          <PointFrame FrameIndex="0" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="40" X="0.0000" Y="100.0000">
            <EasingData Type="0" />
          </PointFrame>
        </Timeline>
        <Timeline ActionTag="1824560160" Property="RotationSkew">
          <ScaleFrame FrameIndex="0" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="40" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="1824560160" Property="BlendFunc">
          <BlendFuncFrame FrameIndex="40" Tween="False" Src="1" Dst="771" />
        </Timeline>
        <Timeline ActionTag="1824560160" Property="Alpha">
          <IntFrame FrameIndex="0" Value="255">
            <EasingData Type="0" />
          </IntFrame>
          <IntFrame FrameIndex="40" Value="0">
            <EasingData Type="0" />
          </IntFrame>
        </Timeline>
      </Animation>
      <ObjectData Name="Node" Tag="7" ctype="GameNodeObjectData">
        <Size X="0.0000" Y="0.0000" />
        <Children>
          <AbstractNodeData Name="inBubble_bear_1" ActionTag="1824560160" Alpha="12" Tag="8" IconVisible="False" LeftMargin="-73.0000" RightMargin="-73.0000" TopMargin="-163.0000" BottomMargin="27.0000" ctype="SpriteObjectData">
            <Size X="146.0000" Y="136.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position Y="95.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="visualcontent/levels/inBubble_bear.png" Plist="" />
            <BlendFunc Src="1" Dst="771" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>