Sub 数据守护者AI功能清单自动美化()
'
' 数据守护者AI功能清单自动美化脚本 V2.0
' 适配最新的指标详细说明功能
'
    Dim ws As Worksheet
    Dim lastRow As Long
    Dim rng As Range
    
    ' 设置当前工作表
    Set ws = ActiveSheet
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    
    ' 禁用屏幕更新以提高性能
    Application.ScreenUpdating = False
    Application.EnableEvents = False
    
    ' 第一步：设置列宽
    ws.Columns("A:A").ColumnWidth = 22  ' 一级功能
    ws.Columns("B:B").ColumnWidth = 20  ' 二级功能
    ws.Columns("C:C").ColumnWidth = 20  ' 三级功能
    ws.Columns("D:D").ColumnWidth = 28  ' 四级功能
    ws.Columns("E:E").ColumnWidth = 80  ' 功能说明（增加以适应指标说明）
    ws.Columns("F:F").ColumnWidth = 10  ' 优先级
    ws.Columns("G:G").ColumnWidth = 12  ' 开发周期
    ws.Columns("H:H").ColumnWidth = 15  ' 负责团队
    ws.Columns("I:I").ColumnWidth = 35  ' 验收标准
    
    ' 第二步：设置表头格式
    With ws.Range("A1:I1")
        .Interior.Color = RGB(34, 45, 50)          ' 深蓝色背景
        .Font.Color = RGB(255, 255, 255)          ' 白色字体
        .Font.Bold = True
        .Font.Size = 12
        .Font.Name = "微软雅黑"
        .HorizontalAlignment = xlCenter
        .VerticalAlignment = xlCenter
        .RowHeight = 35
        .Borders.LineStyle = xlContinuous
        .Borders.Color = RGB(255, 255, 255)
    End With
    
    ' 第三步：添加筛选功能
    ws.Range("A1:I1").AutoFilter
    
    ' 第四步：设置数据区域基础格式
    Set rng = ws.Range("A2:I" & lastRow)
    With rng
        .Font.Name = "微软雅黑"
        .Font.Size = 10
        .RowHeight = 25
        .VerticalAlignment = xlCenter
        .Borders.LineStyle = xlContinuous
        .Borders.Color = RGB(200, 200, 200)
    End With
    
    ' 第五步：设置功能说明列自动换行
    With ws.Columns("E:E")
        .WrapText = True
        .VerticalAlignment = xlTop
    End With
    
    ' 第六步：优先级条件格式
    ' 高优先级
    Set rng = ws.Range("F2:F" & lastRow)
    With rng.FormatConditions.Add(Type:=xlCellValue, Operator:=xlEqual, Formula1:="高")
        .Interior.Color = RGB(255, 199, 206)      ' 浅红色背景
        .Font.Color = RGB(156, 0, 6)             ' 深红色字体
        .Font.Bold = True
    End With
    
    ' 中优先级
    With rng.FormatConditions.Add(Type:=xlCellValue, Operator:=xlEqual, Formula1:="中")
        .Interior.Color = RGB(255, 235, 156)      ' 浅橙色背景
        .Font.Color = RGB(156, 101, 0)           ' 深橙色字体
        .Font.Bold = True
    End With
    
    ' 低优先级
    With rng.FormatConditions.Add(Type:=xlCellValue, Operator:=xlEqual, Formula1:="低")
        .Interior.Color = RGB(198, 239, 206)      ' 浅绿色背景
        .Font.Color = RGB(0, 97, 0)              ' 深绿色字体
        .Font.Bold = True
    End With
    
    ' 第七步：一级功能分组着色
    Call 设置功能分组颜色(ws, lastRow)
    
    ' 第八步：指标功能特殊标识
    Call 标识指标功能(ws, lastRow)
    
    ' 第九步：设置边框
    With ws.Range("A1:I" & lastRow)
        .Borders.LineStyle = xlContinuous
        .Borders.Color = RGB(150, 150, 150)
        .Borders(xlEdgeTop).Weight = xlThick
        .Borders(xlEdgeBottom).Weight = xlThick
        .Borders(xlEdgeLeft).Weight = xlThick
        .Borders(xlEdgeRight).Weight = xlThick
    End With
    
    ' 第十步：冻结窗格
    ws.Range("A2").Select
    ActiveWindow.FreezePanes = True
    
    ' 恢复屏幕更新
    Application.ScreenUpdating = True
    Application.EnableEvents = True
    
    ' 选择起始位置
    ws.Range("A1").Select
    
    MsgBox "数据守护者AI功能清单美化完成！" & vbCrLf & _
           "包含以下特性：" & vbCrLf & _
           "✓ 优先级颜色标识" & vbCrLf & _
           "✓ 功能分组着色" & vbCrLf & _
           "✓ 指标功能特殊标识" & vbCrLf & _
           "✓ 自动筛选和冻结窗格" & vbCrLf & _
           "✓ 专业边框和字体设置", vbInformation, "美化完成"
    
End Sub

Sub 设置功能分组颜色(ws As Worksheet, lastRow As Long)
'
' 为不同的一级功能设置分组颜色
'
    Dim i As Long
    Dim cellValue As String
    
    For i = 2 To lastRow
        cellValue = ws.Cells(i, 1).Value  ' A列（一级功能）
        
        If cellValue <> "" Then
            Select Case cellValue
                Case "系统集成"
                    ws.Range("A" & i & ":I" & i).Interior.Color = RGB(230, 242, 255)  ' 淡蓝色
                Case "智能工作台"
                    ws.Range("A" & i & ":I" & i).Interior.Color = RGB(230, 255, 230)  ' 淡绿色
                Case "AI智能功能"
                    ws.Range("A" & i & ":I" & i).Interior.Color = RGB(245, 230, 255)  ' 淡紫色
                Case "数据驾驶舱"
                    ws.Range("A" & i & ":I" & i).Interior.Color = RGB(255, 242, 230)  ' 淡橙色
                Case "绩效管理"
                    ws.Range("A" & i & ":I" & i).Interior.Color = RGB(255, 230, 230)  ' 淡红色
                Case "激励体系"
                    ws.Range("A" & i & ":I" & i).Interior.Color = RGB(255, 255, 230)  ' 淡黄色
                Case "系统支撑"
                    ws.Range("A" & i & ":I" & i).Interior.Color = RGB(240, 240, 240)  ' 淡灰色
            End Select
            
            ' 一级功能行字体加粗
            ws.Range("A" & i & ":I" & i).Font.Bold = True
            ws.Range("A" & i & ":I" & i).Font.Size = 11
        End If
    Next i
End Sub

Sub 标识指标功能(ws As Worksheet, lastRow As Long)
'
' 为包含指标详细说明的功能进行特殊标识
'
    Dim i As Long
    Dim cellValue As String
    Dim keywords As Variant
    Dim keyword As Variant
    Dim hasKeyword As Boolean
    
    ' 定义关键词
    keywords = Array("指标组成", "计算公式", "排名算法", "算法逻辑", "判定逻辑", "计算维度", "权重分配")
    
    For i = 2 To lastRow
        cellValue = ws.Cells(i, 5).Value  ' E列（功能说明）
        hasKeyword = False
        
        ' 检查是否包含指标相关关键词
        For Each keyword In keywords
            If InStr(cellValue, keyword) > 0 Then
                hasKeyword = True
                Exit For
            End If
        Next keyword
        
        ' 如果包含关键词，进行特殊标识
        If hasKeyword Then
            With ws.Range("E" & i)
                .Interior.Color = RGB(255, 248, 220)     ' 浅金色背景
                .Font.Color = RGB(0, 51, 102)           ' 深蓝色字体
                .Font.Bold = True
            End With
        End If
    Next i
End Sub

Sub 创建功能统计透视表()
'
' 创建功能统计透视表
'
    Dim ws As Worksheet
    Dim pvtTable As PivotTable
    Dim pvtCache As PivotCache
    Dim lastRow As Long
    Dim dataRange As Range
    
    Set ws = ActiveSheet
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Set dataRange = ws.Range("A1:I" & lastRow)
    
    ' 创建透视表缓存
    Set pvtCache = ThisWorkbook.PivotCaches.Create( _
        SourceType:=xlDatabase, _
        SourceData:=dataRange)
    
    ' 在新工作表中创建透视表
    Set pvtTable = pvtCache.CreatePivotTable( _
        TableDestination:=ThisWorkbook.Worksheets.Add.Range("A1"), _
        TableName:="功能统计透视表")
    
    ' 设置透视表字段
    With pvtTable
        .PivotFields("一级功能").Orientation = xlRowField
        .PivotFields("优先级").Orientation = xlRowField
        .PivotFields("四级功能").Orientation = xlDataField
        .PivotFields("负责团队").Orientation = xlPageField
    End With
    
    ' 设置透视表样式
    pvtTable.TableStyle2 = "PivotStyleMedium9"
    
    MsgBox "功能统计透视表创建完成！", vbInformation
End Sub 