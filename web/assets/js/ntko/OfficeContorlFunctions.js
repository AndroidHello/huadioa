var OFFICE_CONTROL_OBJ;//�ؼ�����
var IsFileOpened;      //�ؼ��Ƿ���ĵ�
var fileType ;
var fileTypeSimple;

function intializePage(fileUrl)
{
	OFFICE_CONTROL_OBJ=document.getElementById("TANGER_OCX");
	//initCustomMenus();
	NTKO_OCX_OpenDoc(fileUrl);
	/*
	if(!OFFICE_CONTROL_OBJ.IsNTKOSecSignInstalled()||(fileTypeSimple!="word"&&fileTypeSimple!="excel"))
	{   
		document.all("addSecSignFromUrl").disabled = true;
		document.all("addSecSignFromLocal").disabled = true;
		document.all("addSecSignFromEkey").disabled = true;
		document.all("handSecSign").disabled = true;
	}
	if(!OFFICE_CONTROL_OBJ.IsPDFCreatorInstalled())
	{
		document.all("savePdfTOUrl").disabled = true;
	}*/
}
function onPageClose(){
	if(!OFFICE_CONTROL_OBJ.activeDocument.saved){
		if(confirm( "�ĵ��޸Ĺ�,��û�б���,�Ƿ���Ҫ����?")){
			saveFileToUrl();
			return false;
		}
	}
	return true;
}
function NTKO_OCX_OpenDoc(fileUrl)
{
	OFFICE_CONTROL_OBJ.BeginOpenFromURL(fileUrl);
}
function setFileOpenedOrClosed(bool)
{
	IsFileOpened = bool;
	fileType = OFFICE_CONTROL_OBJ.DocType ;
}
//ɾ���������˵Ŀո�
function trim(str){ 
	var result = str.replace(/(^\s*)|(\s*$)/g, "");
	return result;
}

function saveNoTip(){
	
	setShowRevisions(false);//����ʱ��ǿ�����غۼ�
	var myUrl =document.forms[0].action ;
	var fileName = document.all("fileName").value;
	var result  ;
	if(IsFileOpened){
		fileType = "Word.Document";
		result = OFFICE_CONTROL_OBJ.saveToURL(myUrl,//�ύ����url��ַ
			"upLoadFile",//�ļ����id������<input type=file name=upLoadFile �е�name
			"fileType="+fileType,          //��ؼ�һ���ύ�Ĳ����磺"p1=a&p2=b&p3=c"
			fileName,    //�ϴ��ļ������ƣ�����<input type=file ��value
			0    //��ؼ�һ���ύ�ı�id��Ҳ������form�����кţ�����Ӧ����0.
		);
		result=trim(result);
		document.all("statusBar").innerHTML="������������Ϣ:"+result;
		var paras = result.split('&');
		document.getElementById('fileId').value = paras[1];
		//����Tabҳ��ķ���
		window.parent.Transfer();
	}
}

function saveFileToUrl(isSilence){
	setShowRevisions(false);//����ʱ��ǿ�����غۼ�
	var myUrl =document.forms[0].action ;
	var fileName = document.all("fileName").value;
	var result  ;
	if(IsFileOpened){
		fileType = "Word.Document";
		result = OFFICE_CONTROL_OBJ.saveToURL(myUrl,//�ύ����url��ַ
			"upLoadFile",//�ļ����id������<input type=file name=upLoadFile �е�name
			"fileType="+fileType,          //��ؼ�һ���ύ�Ĳ����磺"p1=a&p2=b&p3=c"
			fileName,    //�ϴ��ļ������ƣ�����<input type=file ��value
			0    //��ؼ�һ���ύ�ı�id��Ҳ������form�����кţ�����Ӧ����0.
		);
		result=trim(result);
		document.all("statusBar").innerHTML="������������Ϣ:"+result;
		var paras = result.split('&');
		document.getElementById('fileId').value = paras[1];
        if(!isSilence){
            alert(paras[0]);
        }
		//window.close();
		//����YW_NWFW��
		//document.actionform.submit();
	}
}
function saveFileAsHtmlToUrl()
{
	var myUrl = "upLoadHtmlFile.jsp"	;
	var htmlFileName = document.all("fileName").value+".html";
	var result;
	if(IsFileOpened)
	{
		result=OFFICE_CONTROL_OBJ.PublishAsHTMLToURL("upLoadHtmlFile.jsp","uploadHtml","htmlFileName="+htmlFileName,htmlFileName);
		result=trim(result);
		document.all("statusBar").innerHTML="������������Ϣ:"+result;
		alert(result);
		window.close();
	}
}
function saveFileAsPdfToUrl()
{
	var myUrl = "upLoadPdfFile.jsp"	;
	var pdfFileName = document.all("fileName").value+".pdf";
	if(IsFileOpened)
	{
		OFFICE_CONTROL_OBJ.PublishAsPdfToURL(myUrl,"uploadPdf","PdfFileName="+pdfFileName,pdfFileName,"","",true,false);
	}
}
function testFunction()
{
	alert(IsFileOpened);
}
function addServerSecSign()
{
	var signUrl=document.all("secSignFileUrl").options[document.all("secSignFileUrl").selectedIndex].value;
	if(IsFileOpened)
	{
		if(OFFICE_CONTROL_OBJ.doctype==1||OFFICE_CONTROL_OBJ.doctype==2)
		{
			try
			{
			alert("��ʽ�汾�û������EKEY��\r\n\r\n��Ϊ����ӡ��ϵͳ��ʾ���ܣ��빺����ʽ�汾��");
			OFFICE_CONTROL_OBJ.AddSecSignFromURL("ntko",signUrl);}
			catch(error){}
		}
		else
		{alert("�����ڸ������ĵ���ʹ�ð�ȫǩ��ӡ��.");}
	}	
}
function addLocalSecSign()
{
	if(IsFileOpened)
	{
		if(OFFICE_CONTROL_OBJ.doctype==1||OFFICE_CONTROL_OBJ.doctype==2)
		{
			try
			{OFFICE_CONTROL_OBJ.AddSecSignFromLocal("ntko","");}
			catch(error){}
		}
		else
		{alert("�����ڸ������ĵ���ʹ�ð�ȫǩ��ӡ��.");}
	}	
}
function addEkeySecSign()
{
	if(IsFileOpened)
	{
		if(OFFICE_CONTROL_OBJ.doctype==1||OFFICE_CONTROL_OBJ.doctype==2)
		{
			try
			{OFFICE_CONTROL_OBJ.AddSecSignFromEkey("ntko");}
			catch(error){}
		}
		else
		{alert("�����ڸ������ĵ���ʹ�ð�ȫǩ��ӡ��.");}
	}
}
function addHandSecSign()
{
	if(IsFileOpened)
	{
		if(OFFICE_CONTROL_OBJ.doctype==1||OFFICE_CONTROL_OBJ.doctype==2)
		{
			try
			{OFFICE_CONTROL_OBJ.AddSecHandSign("ntko");}
			catch(error){}
		}
		else
		{alert("�����ڸ������ĵ���ʹ�ð�ȫǩ��ӡ��.");}
	}
}

function addServerSign(signUrl)
{
	if(IsFileOpened)
	{
			try
			{
				OFFICE_CONTROL_OBJ.AddSignFromURL("ntko",//ӡ�µ��û���
				signUrl,//ӡ�����ڷ��������url
				100,//��߾�
				100,//�ϱ߾� ����Relative���趨ѡ��ͬ���ն���
				"ntko",//����DoCheckSign����ǩ��ӡ����Ϣ,������֤ӡ�µ��ַ���
				3,  //Relative,ȡֵ1-4��������߾���ϱ߾�������¶������ڵ�λ�� 1�����λ�ã�2��ҳ�߾ࣻ3��ҳ����� 4��Ĭ��������������
				100,//����ӡ��,Ĭ��100%
				1);   //0ӡ��λ�������·�,1λ���Ϸ�
				
			}
			catch(error){}
	}		
}

function addLocalSign()
{
	if(IsFileOpened)
	{
			try
			{
				OFFICE_CONTROL_OBJ.AddSignFromLocal("ntko",//ӡ�µ��û���
					"",//ȱʡ�ļ���
					true,//�Ƿ���ʾѡ��
					100,//��߾�
					100,//�ϱ߾� ����Relative���趨ѡ��ͬ���ն���
					"ntko",//����DoCheckSign����ǩ��ӡ����Ϣ,������֤ӡ�µ��ַ���
					3,  //Relative,ȡֵ1-4��������߾���ϱ߾�������¶������ڵ�λ�� 1�����λ�ã�2��ҳ�߾ࣻ3��ҳ����� 4��Ĭ��������������
					100,//����ӡ��,Ĭ��100%
					1);   //0ӡ��λ�������·�,1λ���Ϸ�
			}
			catch(error){}
	}
}
function addPicFromUrl(picURL)
{
	if(IsFileOpened)
	{
		if(OFFICE_CONTROL_OBJ.doctype==1||OFFICE_CONTROL_OBJ.doctype==2)
		{
			try
			{
				OFFICE_CONTROL_OBJ.AddPicFromURL(picURL,//ͼƬ��url��ַ����ʱ��Ի��߾��Ե�ַ
				false,//�Ƿ񸡶�,�˲�������Ϊfalseʱ,top��left��Ч
				100,//left ��߾�
				100,//top �ϱ߾� ����Relative���趨ѡ��ͬ���ն���
				1,  //Relative,ȡֵ1-4��������߾���ϱ߾�������¶������ڵ�λ�� 1�����λ�ã�2��ҳ�߾ࣻ3��ҳ����� 4��Ĭ��������������
				100,//����ӡ��,Ĭ��100%
				1);   //0ӡ��λ�������·�,1λ���Ϸ�
				
			}
			catch(error){}
		}
		else
		{alert("�����ڸ������ĵ���ʹ�ð�ȫǩ��ӡ��.");}
	}		
}
function addPicFromLocal()
{
	if(IsFileOpened)
	{
			try
			{
				OFFICE_CONTROL_OBJ.AddPicFromLocal("",//ӡ�µ��û���
					true,//ȱʡ�ļ���
					false,//�Ƿ���ʾѡ��
					100,//��߾�
					100,//�ϱ߾� ����Relative���趨ѡ��ͬ���ն���
					1,  //Relative,ȡֵ1-4��������߾���ϱ߾�������¶������ڵ�λ�� 1�����λ�ã�2��ҳ�߾ࣻ3��ҳ����� 4��Ĭ��������������
					100,//����ӡ��,Ĭ��100%
					1);   //0ӡ��λ�������·�,1λ���Ϸ�
			}
			catch(error){}
	}
}

function TANGER_OCX_AddDocHeader(strHeader)
{
	if(!IsFileOpened)
	{return;}
	var i,cNum = 30;
	var lineStr = "";
	try
	{
		for(i=0;i<cNum;i++) lineStr += "_";  //�����»���
		with(OFFICE_CONTROL_OBJ.ActiveDocument.Application)
		{
			Selection.HomeKey(6,0); // go home
			Selection.TypeText(strHeader);
			Selection.TypeParagraph(); 	//����
			Selection.TypeText(lineStr);  //�����»���
			// Selection.InsertSymbol(95,"",true); //�����»���
			Selection.TypeText("��");
			Selection.TypeText(lineStr);  //�����»���
			Selection.TypeParagraph();
			//Selection.MoveUp(5, 2, 1); //�������У��Ұ�סShift�����൱��ѡ������
			Selection.HomeKey(6,1);  //ѡ���ļ�ͷ�������ı�
			Selection.ParagraphFormat.Alignment = 1; //���ж���
			with(Selection.Font)
			{
				NameFarEast = "����";
				Name = "����";
				Size = 12;
				Bold = false;
				Italic = false;
				Underline = 0;
				UnderlineColor = 0;
				StrikeThrough = false;
				DoubleStrikeThrough = false;
				Outline = false;
				Emboss = false;
				Shadow = false;
				Hidden = false;
				SmallCaps = false;
				AllCaps = false;
				Color = 255;
				Engrave = false;
				Superscript = false;
				Subscript = false;
				Spacing = 0;
				Scaling = 100;
				Position = 0;
				Kerning = 0;
				Animation = 0;
				DisableCharacterSpaceGrid = false;
				EmphasisMark = 0;
			}
			Selection.MoveDown(5, 3, 0); //����3��
		}
	}
	catch(err){
		alert("����" + err.number + ":" + err.description);
	}
	finally{
	}
}

function insertRedHeadFromUrl(headFileURL)
{
	if(OFFICE_CONTROL_OBJ.doctype!=1)//OFFICE_CONTROL_OBJ.doctype=1Ϊword�ĵ�
	{return;}
	OFFICE_CONTROL_OBJ.ActiveDocument.Application.Selection.HomeKey(6,0);//����ƶ����ĵ���ͷ
	OFFICE_CONTROL_OBJ.addtemplatefromurl(headFileURL);//�ڹ��λ�ò����ͷ�ĵ�
}
function openTemplateFileFromUrl(templateUrl)
{
	OFFICE_CONTROL_OBJ.openFromUrl(templateUrl);
}
function doHandSign()
{
	/*if(OFFICE_CONTROL_OBJ.doctype==1||OFFICE_CONTROL_OBJ.doctype==2)//�˴�����ֻ������word��excel�и���.doctype=1��"word"�ĵ�,doctype=2��"excel"�ĵ�
	{*/
		OFFICE_CONTROL_OBJ.DoHandSign2(
									"ntko",//��дǩ���û�����
									"ntko",//signkey,DoCheckSign(���ӡ�º���)��Ҫ����֤��Կ��
									0,//left
									0,//top
									1,//relative,�趨ǩ��λ�õĲ��ն���.0����ʾ������Ļλ�ò��룬��ʱ��Left,Top���Բ������á�1�����λ�ã�2��ҳ�߾ࣻ3��ҳ����� 4��Ĭ�������������䣨Ϊ������ǰ�汾Ĭ�Ϸ�ʽ��
									100);
	//}
}
function SetReviewMode(boolvalue)
{
	if(OFFICE_CONTROL_OBJ.doctype==1)
	{
		OFFICE_CONTROL_OBJ.ActiveDocument.TrackRevisions = boolvalue;//�����Ƿ����ۼ�
	}
} 

function setShowRevisions(boolevalue)
{
	if(OFFICE_CONTROL_OBJ.doctype==1)
	{
		OFFICE_CONTROL_OBJ.ActiveDocument.ShowRevisions =boolevalue;//�����Ƿ���ʾ�ۼ�
	}
}
function setFilePrint(boolvalue)
{
	OFFICE_CONTROL_OBJ.fileprint=boolvalue;//�Ƿ������ӡ
}
function setFileNew(boolvalue)
{
	//alert("setFileNew");
	OFFICE_CONTROL_OBJ.FileNew=boolvalue;//�Ƿ������½�
}
function setFileSaveAs(boolvalue)
{
	OFFICE_CONTROL_OBJ.FileSaveAs=boolvalue;//�Ƿ��������Ϊ
}

function setIsNoCopy(boolvalue)
{
	OFFICE_CONTROL_OBJ.IsNoCopy=boolvalue;//�Ƿ��ֹճ��
}
//��֤�ĵ��ؼ��Դ�ӡ�¹��ܸǵ���
function DoCheckSign()
{
   if(IsFileOpened)
   {	
			var ret = OFFICE_CONTROL_OBJ.DoCheckSign
			(
			false,/*��ѡ���� IsSilent ȱʡΪFAlSE����ʾ������֤�Ի���,����ֻ�Ƿ�����֤���������ֵ*/
			"ntko"//ʹ�ø���ʱ��signkey,����Ϊ"ntko"
			);//����ֵ����֤����ַ���
			//alert(ret);
   }	
}
//���ù�����
function setToolBar()
{
	OFFICE_CONTROL_OBJ.ToolBars=!OFFICE_CONTROL_OBJ.ToolBars;
}
//�����Ƿ���ʾ���в˵�
function setMenubar()
{
		OFFICE_CONTROL_OBJ.Menubar=!OFFICE_CONTROL_OBJ.Menubar;
}
//���ơ����롰�˵���
function setInsertMemu()
{
		OFFICE_CONTROL_OBJ.IsShowInsertMenu=!OFFICE_CONTROL_OBJ.IsShowInsertMenu;
	}
//���ơ��༭���˵���
function setEditMenu()
{
		OFFICE_CONTROL_OBJ.IsShowEditMenu=!OFFICE_CONTROL_OBJ.IsShowEditMenu;
	}
//���ơ����ߡ��˵���
function setToolMenu()
{
	OFFICE_CONTROL_OBJ.IsShowToolMenu=!OFFICE_CONTROL_OBJ.IsShowToolMenu;
	}
	
//�Զ���˵����ܺ���
function initCustomMenus()
{
	var myobj = OFFICE_CONTROL_OBJ;	
	for(var menuPos=0;menuPos<3;menuPos++)
	{
		myobj.AddCustomMenu2(menuPos,"�˵�"+menuPos+"(&"+menuPos+")"); 
		for(var submenuPos=0;submenuPos<10;submenuPos++)
		{
			if(1 ==(submenuPos % 3)) //���˵����ӷָ�������3��������-1�������˵�����
			{
				myobj.AddCustomMenuItem2(menuPos,submenuPos,-1,false,"-",true);
			}
			else if(0 == (submenuPos % 2)) //���˵������Ӳ˵�����3��������-1�������˵�����
			{
				myobj.AddCustomMenuItem2(menuPos,submenuPos,-1,true,"�Ӳ˵�"+menuPos+"-"+submenuPos,false);
				//�����Ӳ˵���Ŀ
				for(var subsubmenuPos=0;subsubmenuPos<9;subsubmenuPos++)
				{
					if(0 == (subsubmenuPos % 2))//�����Ӳ˵���Ŀ
					{
						myobj.AddCustomMenuItem2(menuPos,submenuPos,subsubmenuPos,false,
							"�Ӳ˵���Ŀ"+menuPos+"-"+submenuPos+"-"+subsubmenuPos,false,menuPos*100+submenuPos*20+subsubmenuPos);
					}
					else //�����Ӳ˵��ָ�
					{
						myobj.AddCustomMenuItem2(menuPos,submenuPos,subsubmenuPos,false,
							"-"+subsubmenuPos,true);
					}
					//���Խ��ú�����
					if(2 == (subsubmenuPos % 4))
					{
						myobj.EnableCustomMenuItem2(menuPos,submenuPos,subsubmenuPos,false);
					}
				}				
			}
			else //���˵�������Ŀ����3��������-1�������˵�����
			{
				myobj.AddCustomMenuItem2(menuPos,submenuPos,-1,false,"�˵���Ŀ"+menuPos+"-"+submenuPos,false,menuPos*100+submenuPos);
			}
			
			//���Խ��ú�����
			if(1 == (submenuPos % 4))
			{
				myobj.EnableCustomMenuItem2(menuPos,submenuPos,-1,false);
			}
		}
	}
}

/*-------------------------��ת���Ĵ�ӡ���֣���ʼ�����ʱ�䣺2013.5.15 ���ߣ����------------------*/
var GwObj = {};//���Ķ���
GwObj.WordState = "GW";
function getWordState(){
	return GwObj.WordState;
}
/*----------------------��������ʼ----------------------*/
/* �������� */
function RestoreToBaiAnGW(){
	if(GwObj.WordState == "GW") return true;
	SetReviewMode(false);//�򿪱����ۼ�����������λ�úܹؼ���
	var mydoc = OFFICE_CONTROL_OBJ.ActiveDocument; //�õ�Document����
	mydoc.Application.PrintPreview = false;//�رմ�ӡԤ��״̬
	if(GwObj.WordState == "HQG"){
		DelHuiQianTemplate();
	}
	GwObj.WordState="GW";//���״̬
	SwitchButton(GwObj.WordState);
}
/* ������ǩ�� */
function BaiAnHQG(){
	OFFICE_CONTROL_OBJ.Activate(true);//���ǰ�ĵ���������ģ����뵽����ĵ���
	//�رմ�ӡԤ��״̬
	var mydoc = OFFICE_CONTROL_OBJ.ActiveDocument; 
	mydoc.Application.PrintPreview = false;
	setShowRevisions(false);//���غۼ�
	SetReviewMode(false);//�رպۼ�����
	InsertTmplateFileAtEnd("BaHuiQianTemplateFile.doc");
	GwObj.WordState="HQG";//���״̬
	SwitchButton(GwObj.WordState);
	SetReviewMode(true);//�򿪺ۼ�����
	return true;
}
//ɾ����ǩ����
function DelHuiQianTemplate(){
	var doc = OFFICE_CONTROL_OBJ.ActiveDocument;
	var count = doc.Tables.count;//ɾ�����һ�����
	var table = doc.Tables(count);
	var lastRow = table.Rows.Count;
	table.Rows(lastRow).Delete();//ɾ���������һ��
	return true;
}
/*--------------------------�������ģ�����--------------------------*/

/* ������״̬�ָ������� */
function RestoreToGW(){
	if(GwObj.WordState == "GW"){
		return true;
	}
	//OFFICE_CONTROL_OBJ.SetReadOnly(false, "");//�ر��ĵ�ֻ��
	SetReviewMode(false);//�򿪱����ۼ�����������λ�úܹؼ���
	var mydoc = OFFICE_CONTROL_OBJ.ActiveDocument; //�õ�Document����
	mydoc.Application.PrintPreview = false;//�رմ�ӡԤ��״̬
	if(GwObj.WordState == "HQG"){
		if( GetTitleContent() == false || DeleteContentBeforeZW() == false ){
			return false;
		}
		InsertTmplateFileAtHome("NiwenHeaderTemplateFile.doc");
		OFFICE_CONTROL_OBJ.SetBookmarkValue("�ĺ�", GwObj.WHContent) ;
		OFFICE_CONTROL_OBJ.SetBookmarkValue("����", GwObj.TitleContent) ;
	}
	if(GwObj.WordState == "HR"){
		ShowRedLine();
		ShowRedHead();
	}
	GwObj.WordState="GW";//���״̬
	SwitchButton(GwObj.WordState);
}
/* ��ǩ�� */
function HQGPrintOut(){
	OFFICE_CONTROL_OBJ.Activate(true);//���ǰ�ĵ���������ģ����뵽����ĵ���
	var nodebh = "190";
	if( $("#NODEBH").length > 0 ){
		var nodebh = $("#NODEBH").val();
	}
	//�رմ�ӡԤ��״̬
	var mydoc = OFFICE_CONTROL_OBJ.ActiveDocument; 
	mydoc.Application.PrintPreview = false;
	setShowRevisions(false);//���غۼ�
	SetReviewMode(false);//�رպۼ�����
	if(GwObj.WordState == "HR"){
		ShowRedLine();
		ShowRedHead();
	}
	if(GetWHContent() == false || GetTitleContent() == false ){
		return false;
	}
	if(DeleteContentBeforeZW() == false){//�����İ��������͵�λ
		return false;
	}
	DeleteBookMarkObjBeforeZW();
	if( nodebh == "190" ){ //���Ļ���
		InsertTmplateFileAtHome("FwHuiQianTemplateFile.doc");
		OFFICE_CONTROL_OBJ.SetBookmarkValue("�ĺ�", GwObj.WHContent) ;
		OFFICE_CONTROL_OBJ.SetBookmarkValue("����", GwObj.TitleContent) ;
	}else{
		InsertTmplateFileAtHome("HuiQianTemplateFile.doc");
		OFFICE_CONTROL_OBJ.SetBookmarkValue("����", GwObj.TitleContent) ;
	}
	GwObj.WordState="HQG";//���״̬
	SwitchButton(GwObj.WordState);
	SetReviewMode(true);//�򿪺ۼ�����
	return true;
}
/* ���׺� */
function HideRed(){
	OFFICE_CONTROL_OBJ.Activate(true);
	//�رմ�ӡԤ��״̬
	var mydoc = OFFICE_CONTROL_OBJ.ActiveDocument; 
	if( mydoc.Application.PrintPreview == true){
		mydoc.Application.PrintPreview = false;
	}
	setShowRevisions(false);//���غۼ�
	SetReviewMode(false);//�رպۼ������������ġ��򿪺ۼ�������
	if(GwObj.WordState == "HQG"){
		if( GetTitleContent() == false || DeleteContentBeforeZW() == false ){
			return false;
		}
		InsertTmplateFileAtHome("NiwenHeaderTemplateFile.doc");
		OFFICE_CONTROL_OBJ.SetBookmarkValue("�ĺ�", GwObj.WHContent) ;
		OFFICE_CONTROL_OBJ.SetBookmarkValue("����", GwObj.TitleContent) ;
	}
	HideRedLine();
	HideRedHead();
	GwObj.WordState="HR";//���״̬
	SwitchButton(GwObj.WordState);
}
//��ȡ�ĺ�
function GetWHContent(){
	var BookMarkName = "�ĺ�";
	if(ValidateBookMark(BookMarkName) == false){
		return false;
	}
	GwObj.WHContent = OFFICE_CONTROL_OBJ.GetBookmarkValue(BookMarkName);//
	return true;
}
//��ȡ����
function GetTitleContent(){
	var BookMarkName = "����";
	if(ValidateBookMark(BookMarkName) == false){
		return false;
	}
	GwObj.TitleContent = OFFICE_CONTROL_OBJ.GetBookmarkValue(BookMarkName);
	return true;
}
//ɾ���������ϵ��ĵ�����
function DeleteContentBeforeZW(){
	//˼·��ѡ���ĵ���ʼλ�ã��ٰѿ�ʼλ�ú͡����⡿��ǩ��{����λ��}��֮���������Ϊһ����Χ
	var mydoc = OFFICE_CONTROL_OBJ.ActiveDocument; //�õ�Document����
	var app = mydoc.Application; //�õ�Application����
	var sel = app.Selection; //�õ�Selection����
	var start = 0;//�趨�ĵ��Ŀ�ʼλ��
	var BookMarkName = "����";
	if(ValidateBookMark(BookMarkName) == false){
		return false;
	}
	var end = mydoc.BookMarks(BookMarkName).End;//����ǩ���ĵ��Ľ���λ��
	
	mydoc.Range(start, end+2 ).Delete();//ɾ��
	//sel.TypeParagraph(); //����
	return true;
}
//ɾ���������ϵ���ǩ����
function DeleteBookMarkObjBeforeZW(){
	//ɾ����ǩ���󣨱�����ģ���ļ��е���ǩ������ͻ��
	DeleteBookMark("��ͷ");
	DeleteBookMark("����");
	DeleteBookMark("�ĺ�");	
	DeleteBookMark("����");	
}

//����ģ���ļ����ĵ����ˣ��ú������ܿ��Ե������ԣ�
function InsertTmplateFileAtHome( fileName ){
	var mydoc = OFFICE_CONTROL_OBJ.ActiveDocument; //�õ�Document����
	var app = mydoc.Application; //�õ�Application����
	var sel = app.Selection; //�õ�Selection����
	//������Ƶ��ĵ���ʼλ��
	sel.HomeKey(6);
	//�ڹ�괦����ģ��
	OFFICE_CONTROL_OBJ.AddTemplateFromURL("../../../ntko/spglTemplateFile/"+fileName, true);//ģ��·������Ե�ǰ��ҳ��URL
}
//����ģ���ļ����ĵ��׶�
function InsertTmplateFileAtEnd( fileName ){
	var mydoc = OFFICE_CONTROL_OBJ.ActiveDocument; //�õ�Document����
	var app = mydoc.Application; //�õ�Application����
	var sel = app.Selection; //�õ�Selection����
	//������Ƶ��ĵ�ĩβλ��
	sel.EndKey(6);
	//�ڹ�괦����ģ��
	OFFICE_CONTROL_OBJ.AddTemplateFromURL("../../../ntko/spglTemplateFile/"+fileName, true);//ģ��·������Ե�ǰ��ҳ��URL
	//AddTemplateFromURL��������У�ɾ���ĵ����Ķ������
	sel.endkey(6);
    var endline = sel.information(10);//�����ĳ��
    sel.GoTo(-1,0,0,"��ǩ����");
    var bookmarkline = sel.information(10);//�����ĳ��
    //alert( "endline="+endline+",bookmarkline="+bookmarkline );
    var num = endline-bookmarkline;
    sel.endkey(6);
    for(var i=1;i<=num;i++){
    	sel.Delete();
    }
}
function ShowRedLine(){
	OFFICE_CONTROL_OBJ.ActiveDocument.bookmarks('����').range.ShapeRange(1).Line.ForeColor.RGB = 255;
}
function HideRedLine(){
	OFFICE_CONTROL_OBJ.ActiveDocument.bookmarks('����').range.ShapeRange(1).Line.ForeColor.RGB = 16777215;
}
function ShowRedHead(){
	OFFICE_CONTROL_OBJ.ActiveDocument.Bookmarks('��ͷ').Range.Font.Color = 255;
}
function HideRedHead(){
	OFFICE_CONTROL_OBJ.ActiveDocument.Bookmarks('��ͷ').Range.Font.Color = 16777215;
}
//
function SwitchButton( WordState ){
	var IsDisabled = false;
	var IsDisabled_HQG = false;
	var IsDisabled_HR = false;
	if( WordState == "HQG" ){
		IsDisabled = true ;
		IsDisabled_HQG = true;
	}else if( WordState == "HR" ){
		IsDisabled = true ;
		IsDisabled_HR = true;
	}
	//officeEdit
	if( document.getElementById("HQGPrint")){
		document.getElementById("HQGPrint").disabled = IsDisabled_HQG ;
	}
	if( document.getElementById("HR")){
		document.getElementById("HR").disabled = IsDisabled_HR ;
	}
	if( document.getElementById("SaveGW")){//���棨id��save �г�ͻ��
		document.getElementById("SaveGW").disabled = IsDisabled ;
	}
	//tab
	var oDoc = top.parent.document;
	if( oDoc.getElementById("btn_submit") ){//tab�ϵ��ύ
		oDoc.getElementById("btn_submit").disabled = IsDisabled ;
	}
	if( oDoc.getElementById("save")){//tab�ϵı���
		oDoc.getElementById("save").disabled = IsDisabled ;
	}
	if( oDoc.getElementById("btn_tb")){//tab�ϵ��˰죨���ģ�
		oDoc.getElementById("btn_tb").disabled = IsDisabled ;
	}
	if( oDoc.getElementById("btn_refuse")){//tab�ϵĻ��ˣ����ģ�
		oDoc.getElementById("btn_refuse").disabled = IsDisabled ;
	}
	if( oDoc.getElementById("restore")){//tab�ϵĻ�ԭ�����ģ�
		oDoc.getElementById("restore").disabled = IsDisabled ;
	}
}

//��֤��ǩ�Ƿ����
function ValidateBookMark(BookMarkName){
	if( !OFFICE_CONTROL_OBJ.ActiveDocument.BookMarks.Exists(BookMarkName) ){
		alert("�����в���������Ϊ��\""+BookMarkName+"\"����ǩ��");
		return false;
	}
	return true;
}
//�ӳٺ���
function delay(){
	for(var i=0; i<5999999; i++);
}
//����
function undo( StepNum ){
	OFFICE_CONTROL_OBJ.activedocument.undo( StepNum );
}
//ɾ����ǩ����
function DeleteBookMark(BookMarkName){
	try{
		var bkmkObj = OFFICE_CONTROL_OBJ.ActiveDocument.BookMarks(BookMarkName);
		bkmkObj.Delete();
	}catch(e){
		//alert("�����в���������Ϊ��\""+BookMarkName+"\"����ǩ��");
	}
}
//���Ϊ
function mysaveAs(){
	var TANGER_OCX = document.getElementById("TANGER_OCX");
	SetReviewMode(false);//�رպۼ�����
	//���Ϊ�ļ���
	if(ValidateBookMark('����') && ValidateBookMark('�ĺ�') ){
		var bt = TANGER_OCX.GetBookmarkValue('����');
		var wh = TANGER_OCX.GetBookmarkValue('�ĺ�');
		bt = bt.replace(/[\r\n]/g, "");//���˻��з�
		TANGER_OCX.WebFileName=wh+bt+".doc";
	}
	TANGER_OCX.ActiveDocument.AcceptAllRevisions();//�������е��޶�
	TANGER_OCX.ShowDialog(2);//�򿪱��洰��
	TANGER_OCX.activedocument.undo( 1 );//ȡ�������������޶���
	SetReviewMode(true);//�����ۼ�����
}
//��֤��ǩ�Ƿ����
function ValidateBookMark(BookMarkName){
	var TANGER_OCX = document.getElementById("TANGER_OCX");
	if( !TANGER_OCX.ActiveDocument.BookMarks.Exists(BookMarkName) ){
		return false;
	}
	return true;
}
/*Ԥ��*/
function PrintPreview(){
	//�ڶ��ε���ǹر�Ԥ��״̬
	OFFICE_CONTROL_OBJ.PrintPreview() ;
}
/**********************************��ת���Ĵ�ӡ���֣�����*********************************************/









/*
function HideBookMark(BookMarkName){
	//
	var bkmkObj = OFFICE_CONTROL_OBJ.ActiveDocument.BookMarks(BookMarkName);
	if(!bkmkObj){
		alert("Word ģ���в���������Ϊ��\""+BookMarkName+"\"����ǩ��");
		return;
	}
	var saverange = bkmkObj.Range;
	saverange.Text = '';
	OFFICE_CONTROL_OBJ.ActiveDocument.Bookmarks.Add(BookMarkName, saverange);
}



//ɾ���������ϵĲ��֣��ú������ܿ��Ե������ԣ�
//bug��ֻɾ����������
//״̬������
//function DeleteBeforeTitle(){
//	var mydoc = OFFICE_CONTROL_OBJ.ActiveDocument; //�õ�Document����
//	with(mydoc.Paragraphs){
//		for(var i=1; i<Count; i++){
//			with(Item(i).Range){
//				if( Bookmarks.Exists("����") == true ){
//					return ;
//				}
//				Delete();
//			}
//		}
//	}
//}
*/



function TANGER_OCX_DoPaiBan(URL){
	var TANGER_OCX_OBJ = document.all("TANGER_OCX");
	try{
		TANGER_OCX_OBJ.ActiveDocument.Application.Selection.GoTo(3,1,6,"");//��������������λ��
		TANGER_OCX_OBJ.ActiveDocument.Application.Selection.MoveDown(5,99,1);//��һ������������������ƶ�,�ڶ�������������
		var gw = TANGER_OCX_OBJ.ActiveDocument.Application.Selection;
		gw.Copy();
		

		TANGER_OCX_OBJ.ActiveDocument.Application.Selection.MoveDown(5,99,1);//��һ������������������ƶ�,�ڶ�������������
		//TANGER_OCX_SetMarkModify(false);
		//curSel.WholeStory();
		//curSel.Cut();
		//����ģ��
		TANGER_OCX_OBJ.AddTemplateFromURL(URL);
		var BookMarkName = "����";
		var bkmkObj = TANGER_OCX_OBJ.ActiveDocument.BookMarks(BookMarkName);//�����ˣ���ֱ���쳣������ִ��������ж�
		var saverange = bkmkObj.Range; 
		saverange.Paste();
		//saverange.Paste();
		//TANGER_OCX_OBJ.ActiveDocument.Bookmarks.Add(BookMarkName,saverange);		
		TANGER_OCX_OBJ.ActiveDocument.Bookmarks.Add(BookMarkName, saverange);		
		//TANGER_OCX_SetMarkModify(true);
	}catch(err)	{
		alert("����" + err.number + ":" + err.description);
	};
}

function getfirstlinetext(){
	//ѡ��ǰ�ĵ���ָ������
	var TANGER_OCX_OBJ = document.all("TANGER_OCX");
	TANGER_OCX_OBJ.ActiveDocument.Application.Selection.GoTo(3,1,6,"");//��������������λ��
	TANGER_OCX_OBJ.ActiveDocument.Application.Selection.MoveDown(5,99,1);//��һ������������������ƶ�,�ڶ�������������
	alert(TANGER_OCX_OBJ.ActiveDocument.Application.Selection.Range.Text);
}

function CopyTextToBookMark(inputValue, BookMarkName){
	try{
		if(inputValue == ''){
			return; //�գ����滻
		}
		var TANGER_OCX = document.all("TANGER_OCX");
		
		var bkmkObj = TANGER_OCX.ActiveDocument.BookMarks(BookMarkName);
		if(!bkmkObj){
			alert("Word ģ���в���������Ϊ��\""+BookMarkName+"\"����ǩ��");
		}
		var saverange = bkmkObj.Range;
		saverange.Text = inputValue;
		TANGER_OCX.ActiveDocument.Bookmarks.Add(BookMarkName, saverange);
	}
	catch(err){
		alert("CopyTextToBookMark "+err.number + ":" + err.description);
	}
	finally{
	}		
}

function CNDateString(date){
	var arr = date.split('-');
	  var cn = ["��","һ","��","��","��","��","��","��","��","��"];
	  var result = [];
	  /*��*/
	  var YYYY = arr[0];
	  for (var i=0; i<YYYY.length; i++){
		  if( cn[YYYY.charAt(i)] ){
			  result.push(cn[YYYY.charAt(i)]);
		  }else{
			  result.push(YYYY.charAt(i));
		  }
	  }
	  result.push("��");
	  /*��*/
	  var M = arr[1];
	  M = parseInt(M,10);//10����
	  var remainder = ((M%10)==0 ? "" : cn[M%10]);//����10�е���
	  if( M<10 ){
		  result.push(cn[M]);
	  }else if( M<20 ){
		  result.push("ʮ" + remainder );
	  }
	  result.push("��");
	  /*��*/
	  var DD = arr[2];
	  DD = parseInt(DD, 10);//10����
	  remainder = ((DD%10)==0 ? "" : cn[DD% 10]);//����10��20��30�е���
	  if(DD<10){
		  result.push(cn[DD]);
	  }else if(DD<20){
		  result.push("ʮ" + remainder );
	  }else if(DD<30){
		  result.push("��ʮ" + remainder );
	  }else{
		  result.push("��ʮ" + remainder );
	  }
	  result.push("��"); 
	  
	  return result.join('');
}

function CopyTableToWord(tableObj)
{
	//alert("CopyTableToWord");
	var ocxObj = document.all("TANGER_OCX"); //��ÿؼ�����
	 //����������table����
	var tableRows = tableObj.rows.length; //���table����
	var tableCols = tableObj.rows(0).cells.length; //���table����������ÿ�е�������һ��
	//����һ��word�ĵ�
	ocxObj.CreateNew("word.Document");
	//��Word�ĵ��в���tableRows�У�tableCols�еı��
	var curSel = ocxObj.ActiveDocument.Application.Selection;
	curSel.EndKey(6); //��ת���ĵ�β��
	var newtable = ocxObj.ActiveDocument.Tables.Add(curSel.Range, tableRows, tableCols);
	//�趨word���߿�
	newtable.Borders.InsideLineStyle = true;
	newtable.Borders.InsideLineStyle = 1;
	newtable.Borders.OutsideLineStyle = 7;
	//����html���ֵ��word������
	for (i=0; i < tableObj.rows.length; i++){
		for (j=0; j < tableObj.rows(i).cells.length; j++) { 
			newtable.Cell(i+1,j+1).Range.InsertAfter(tableObj.rows(i).cells(j).innerText); 
		}
	}
}


// addtime��2013-3-6 



//(2)Ҫ��ȡ�ĵ����޸���Ϣ���Ե��ô���:
function TANGER_OCX_Revisions(){
	var rev="";
	var TANGER_OCX_OBJ = document.all("TANGER_OCX");
	var cou=TANGER_OCX_OBJ.ActiveDocument.Revisions.Count;//��ȡ�޶�����Ŀ
	for(var i=1;i<=cou;i++){
		var typ="";
		var range=TANGER_OCX_OBJ.ActiveDocument.Revisions(i).Range;//��ȡ�޸ĵ�����
		//�ж��޶�����,ֵ1Ϊ����,ֵ2Ϊɾ��
		if(1==TANGER_OCX_OBJ.ActiveDocument.Revisions(i).TYPE){
			typ="�����޶�";
		}else{
			typ="ɾ���޶�";
		} 
		rev+=(TANGER_OCX_OBJ.ActiveDocument.Revisions(i).Author+":"+typ+"���� "+range+"\n");
	} 
	alert(rev);
}

//����word�������Ƿ���ʾ
function ScrollBar(){
	var TANGER_OCX_OBJ = document.all("TANGER_OCX");
    if(TANGER_OCX_OBJ.doctype == 1){ // word���й�����
        //ˮƽ������
	    TANGER_OCX_OBJ.ActiveDocument.ActiveWindow.DisplayHorizontalScrollBar = false;
        //��ֱ������
    	TANGER_OCX_OBJ.ActiveDocument.ActiveWindow.DisplayVerticalScrollBar = true;
    }
}

function toggerScrollBar(){
	var TANGER_OCX_OBJ = document.all("TANGER_OCX");
    if(TANGER_OCX_OBJ.doctype == 1) { // word���й�����
        //ˮƽ������
        TANGER_OCX_OBJ.ActiveDocument.ActiveWindow.DisplayHorizontalScrollBar = !TANGER_OCX_OBJ.ActiveDocument.ActiveWindow.DisplayHorizontalScrollBar;
        //��ֱ������
        TANGER_OCX_OBJ.ActiveDocument.ActiveWindow.DisplayVerticalScrollBar = !TANGER_OCX_OBJ.ActiveDocument.ActiveWindow.DisplayVerticalScrollBar;
    }
}

function hiddenToolbar(){
    var TANGER_OCX_OBJ = document.all("TANGER_OCX");
    TANGER_OCX_OBJ.toolbars = false;

}




